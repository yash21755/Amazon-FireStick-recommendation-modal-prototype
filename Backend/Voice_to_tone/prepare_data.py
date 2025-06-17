# prepare_data.py

import os
import numpy as np
import librosa
from sklearn.preprocessing import LabelEncoder
from keras.utils import to_categorical

DATA_DIR = "./ravdess"  # <- change this to your dataset folder
X, y = [], []

for root, _, files in os.walk(DATA_DIR):
    for file in files:
        if file.endswith(".wav"):
            file_path = os.path.join(root, file)
            try:
                y_audio, sr = librosa.load(file_path, duration=3, offset=0.5)
                mfcc = librosa.feature.mfcc(y=y_audio, sr=sr, n_mfcc=40)
                mfcc_scaled = np.mean(mfcc.T, axis=0)
                X.append(mfcc_scaled)

                # Emotion encoded in file name — update as per your dataset
                emotion_label = int(file.split("-")[2])  # RAVDESS: label in 3rd position
                y.append(emotion_label)
            except Exception as e:
                print("Error:", file_path, e)

# Convert to arrays
X = np.array(X)
y = np.array(y)

# Encode labels
le = LabelEncoder()
y_encoded = to_categorical(le.fit_transform(y))

# Save
np.save("X_features.npy", X)
np.save("y_labels.npy", y_encoded)

print("Data prepared and saved!")
