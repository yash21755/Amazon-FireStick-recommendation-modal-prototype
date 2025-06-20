import os
import librosa
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

def extract_features(file_path):
    try:
        audio, sample_rate = librosa.load(file_path, res_type='kaiser_fast')
        mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
        return np.mean(mfccs.T, axis=0)
    except:
        return None

# Map for standardizing emotion labels
emotion_map = {
    'neutral': 'neutral',
    'calm': 'calm',
    'happy': 'happy',
    'sad': 'sad',
    'angry': 'angry',
    'fear': 'fearful',
    'disgust': 'disgust',
    'surprise': 'surprised'
}

X, y = [], []

# --- RAVDESS ---
for root, dirs, files in os.walk("ravdess"):
    for file in files:
        if file.endswith(".wav"):
            path = os.path.join(root, file)
            emotion_code = file.split("-")[2]
            emotion_label = {
                '01': 'neutral', '02': 'calm', '03': 'happy', '04': 'sad',
                '05': 'angry', '06': 'fearful', '07': 'disgust', '08': 'surprised'
            }.get(emotion_code)
            features = extract_features(path)
            if features is not None:
                X.append(features)
                y.append(emotion_label)

# --- CREMA-D ---
for root, dirs, files in os.walk("crema-d"):
    for file in files:
        if file.endswith(".wav"):
            path = os.path.join(root, file)
            emotion_code = file.split("_")[2]
            crema_emotions = {
                'NEU': 'neutral', 'HAP': 'happy', 'SAD': 'sad', 'ANG': 'angry',
                'FEA': 'fearful', 'DIS': 'disgust'
            }
            emotion_label = crema_emotions.get(emotion_code)
            features = extract_features(path)
            if emotion_label and features is not None:
                X.append(features)
                y.append(emotion_label)

# --- TESS ---
for root, dirs, files in os.walk("tess"):
    for file in files:
        if file.endswith(".wav"):
            path = os.path.join(root, file)
            for emotion_key in emotion_map:
                if emotion_key.upper() in file.upper():
                    emotion_label = emotion_map[emotion_key]
                    features = extract_features(path)
                    if features is not None:
                        X.append(features)
                        y.append(emotion_label)
                    break

# Convert to arrays
X = np.array(X)
y = np.array(y)

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model and data
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

np.save("features.npy", X)
np.save("labels.npy", y)
np.save("X_test.npy", X_test)
np.save("y_test.npy", y_test)

print("Model trained and saved successfully with RAVDESS, CREMA-D, and TESS.")
