import pickle
import numpy as np
from sklearn.metrics import accuracy_score

X = np.load("features.npy")
y = np.load("labels.npy")

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
