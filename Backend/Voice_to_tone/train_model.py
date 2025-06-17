import numpy as np
import tensorflow as tf
import tensorflow.keras.layers as L
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split
import pickle

# Load preprocessed features and labels
X = np.load("X_features.npy")   # shape: (samples, features)
y = np.load("y_labels.npy")     # shape: (samples,)

# Normalize and reshape input
X = X.astype('float32')
X = X / np.max(X)
X = np.expand_dims(X, axis=2)  # for Conv1D

# One-hot encode labels
with open("encoder2.pickle", "rb") as f:
    encoder = pickle.load(f)

y = encoder.transform(np.array(y).reshape(-1, 1))
y = to_categorical(y)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the CNN model
model = tf.keras.Sequential([
    L.Conv1D(512, kernel_size=5, strides=1, padding='same', activation='relu', input_shape=(X_train.shape[1], 1)),
    L.BatchNormalization(),
    L.MaxPool1D(pool_size=5, strides=2, padding='same'),

    L.Conv1D(512, kernel_size=5, strides=1, padding='same', activation='relu'),
    L.BatchNormalization(),
    L.MaxPool1D(pool_size=5, strides=2, padding='same'),
    L.Dropout(0.2),

    L.Conv1D(256, kernel_size=5, strides=1, padding='same', activation='relu'),
    L.BatchNormalization(),
    L.MaxPool1D(pool_size=5, strides=2, padding='same'),

    L.Conv1D(256, kernel_size=3, strides=1, padding='same', activation='relu'),
    L.BatchNormalization(),
    L.MaxPool1D(pool_size=5, strides=2, padding='same'),
    L.Dropout(0.2),

    L.Conv1D(128, kernel_size=3, strides=1, padding='same', activation='relu'),
    L.BatchNormalization(),
    L.MaxPool1D(pool_size=3, strides=2, padding='same'),
    L.Dropout(0.2),

    L.Flatten(),
    L.Dense(512, activation='relu'),
    L.BatchNormalization(),
    L.Dense(8, activation='softmax')  # 8 classes for RAVDESS
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model.summary()

# Train the model
history = model.fit(X_train, y_train, epochs=40, batch_size=32, validation_data=(X_test, y_test))

# Save model
model_json = model.to_json()
with open("CNN_model.json", "w") as json_file:
    json_file.write(model_json)

model.save_weights("CNN_model_weights.h5")

# print("✅ Model and weights saved successfully.")
