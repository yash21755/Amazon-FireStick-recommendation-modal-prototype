from flask import Flask, request, jsonify
import numpy as np
import librosa
import pickle
from tensorflow.keras.models import model_from_json

app = Flask(__name__)

# === Load model ===
with open("CNN_model.json", "r") as json_file:
    loaded_model_json = json_file.read()
model = model_from_json(loaded_model_json)
model.load_weights("CNN_model_weights.h5")
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# === Load scaler and encoder ===
with open("scaler2.pickle", "rb") as f:
    scaler = pickle.load(f)

with open("encoder2.pickle", "rb") as f:
    encoder = pickle.load(f)

# === Audio feature extraction ===
def zcr(data, frame_length, hop_length):
    return np.squeeze(librosa.feature.zero_crossing_rate(data, frame_length=frame_length, hop_length=hop_length))

def rmse(data, frame_length=2048, hop_length=512):
    return np.squeeze(librosa.feature.rms(data, frame_length=frame_length, hop_length=hop_length))

def mfcc(data, sr, frame_length=2048, hop_length=512, flatten=True):
    mfccs = librosa.feature.mfcc(data, sr=sr, n_mfcc=40)
    return np.squeeze(mfccs.T) if not flatten else np.ravel(mfccs.T)

def extract_features(data, sr=22050, frame_length=2048, hop_length=512):
    result = np.hstack((
        zcr(data, frame_length, hop_length),
        rmse(data, frame_length, hop_length),
        mfcc(data, sr, frame_length, hop_length)
    ))
    return result

def get_predict_feat(path):
    data, s_rate = librosa.load(path, duration=2.5, offset=0.6)
    features = extract_features(data, sr=s_rate)
    features = np.reshape(features, (1, -1))
    scaled = scaler.transform(features)
    return np.expand_dims(scaled, axis=2)

# === Flask route ===
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    path = "temp.wav"
    file.save(path)

    try:
        features = get_predict_feat(path)
        prediction = model.predict(features)
        label = encoder.inverse_transform(prediction)
        return jsonify({"emotion": label[0][0]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
