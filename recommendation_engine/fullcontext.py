import librosa
import numpy as np
import pickle
import sounddevice as sd
from scipy.io.wavfile import write
from datetime import datetime
import requests

# ===== Load trained model =====
model = pickle.load(open("model.pkl", "rb"))

# ===== Feature extraction function =====
def extract_features(file):
    audio, sample_rate = librosa.load(file, res_type='kaiser_fast')
    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=40)
    return np.mean(mfccs.T, axis=0)

# ===== Record audio from microphone =====
def record_audio(filename="test_audio.wav", duration=3, fs=22050):
    print("Recording for", duration, "seconds...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='float32')
    sd.wait()
    write(filename, fs, audio)
    print("Saved to", filename)
    return filename

# ===== Predict emotion from voice =====
def get_voice_emotion(file_path):
    features = extract_features(file_path)
    features = features.reshape(1, -1)
    prediction = model.predict(features)
    return prediction[0]

# ===== Get time of day =====
def get_time_of_day():
    hour = datetime.now().hour
    if 5 <= hour < 12:
        return "morning"
    elif 12 <= hour < 17:
        return "afternoon"
    elif 17 <= hour < 21:
        return "evening"
    else:
        return "night"

# ===== Get weather and temperature =====
def get_weather_info(city="Delhi", api_key="25181cbe26bb401de7581da03e06ea0e"):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url)
        data = response.json()
        weather = data['weather'][0]['main']
        temperature = data['main']['temp']
        return weather, temperature
    except:
        return "Unknown", "Unknown"

# ===== Extract full context (for import use) =====
def get_context():
    file_path = record_audio()
    voice_emotion = get_voice_emotion(file_path)
    time_of_day = get_time_of_day()
    weather, temperature = get_weather_info()
    return {
        "emotion": voice_emotion,
        "time_of_day": time_of_day,
        "weather": weather,
        "temperature": temperature
    }

# ===== MAIN TEST RUN =====
if __name__ == "__main__":
    context = get_context()
    print("\n📊 Final Mood Recommendation Context:")
    for key, value in context.items():
        print(f"{key.capitalize()}: {value}")
