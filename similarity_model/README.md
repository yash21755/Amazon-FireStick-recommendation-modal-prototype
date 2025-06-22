# Similarity Model

A backend microservice for generating "Because You Watched" recommendations using content similarity and user watch history. This service is designed to complement the main recommendation engine by surfacing similar movies or series based on recent user engagement.

---

## 📦 Folder Context

This folder contains the backend logic, model code, and API endpoints for the similarity-based recommendation service. It is intended to be run as a standalone microservice and exposes RESTful APIs for consumption by the main frontend or other backend services.

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yash21755/Amazon-FireStick-recommendation-modal-prototype.git
   cd Amazon-FireStick-recommendation-modal-prototype/similarity_model
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **(Optional) Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your values.

---

## 🧠 Model Description

- **Type:** Content Similarity using feature vectors (genre, category, etc.) and cosine similarity.
- **Features:** Uses recent watch history to identify a reference movie/series, then computes similarity scores to recommend top-N similar items.
- **Training:** No explicit training; relies on feature engineering and similarity computation.
- **Inference:** Real-time similarity computation on request.

---

## 📝 Input Parameters

- **Database:** CSV file containing user watch history and content features.
- **Reference Selection:** The most recently and most-watched item is used as the reference for similarity.
- **Similarity Features:** Genre/category columns (e.g., Drama, Action, Comedy, etc.)

---

## 🔗 API Endpoints

### `GET /api/similiar`
- **Description:** Returns a list of movies/series similar to the user's most recently watched item.
- **Request:** No body required.
- **Response:**
  ```json
  {
    "reference": "The Office",
    "similar": [
      {
        "id": "Parks and Recreation-2015",
        "title": "Parks and Recreation",
        "img": "https://...jpg",
        "Image-src": "https://...jpg",
        "rating": 8.6,
        "Year": "2015",
        "description": "Comedy"
      },
      ...
    ]
  }
  ```
- **Authentication:** Not required (by default)

---

## ⚙️ Environment Variables

| Variable      | Description                              | Example Value         |
|---------------|------------------------------------------|----------------------|
| `PORT`        | Port to run the server                   | `5001`               |
| `DEBUG`       | Debug mode (`True`/`False`)              | `True`               |
| `DATABASE_PATH` | Path to the movie dataset CSV          | `database/updated_movie_dataset.csv` |

**Sample `.env.example`:**
```env
PORT=5001
DEBUG=True
DATABASE_PATH=database/updated_movie_dataset.csv
```

---

## ▶️ Running the Server

**Development:**
```bash
python main.py
# By default runs on http://localhost:5001
```

**Production (example with Gunicorn):**
```bash
gunicorn -w 2 -b 0.0.0.0:5001 main:app
```

**Docker (if supported):**
```bash
docker build -t similarity-model .
docker run -p 5001:5001 --env-file .env similarity-model
```

---

## 📁 Folder Structure

```
similarity_model/
├── database/                   # Movie/series dataset CSVs
│   └── updated_movie_dataset.csv
├── scripts/                    # Similarity model logic
│   └── similarity_model.py
├── main.py                     # API server (Flask)
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

---

## 🧪 Testing

- **Unit/Integration Tests:**  
  Place test scripts in a `tests/` folder or use ad-hoc scripts for validation.
- **Run tests with:**
  ```bash
  pytest tests/
  # or
  python main.py
  ```
- **Tools:**  
  [pytest](https://docs.pytest.org/), [unittest](https://docs.python.org/3/library/unittest.html)

---

## 🚀 Deployment & Hosting

- **Local:**  
  Runs on `http://localhost:5001` by default.
- **Production:**  
  Deploy with Gunicorn, Docker, or any WSGI-compatible server.
- **REST Endpoints:**  
  Exposed for consumption by frontend or other services.

---

## 📚 Real-World Use Cases

- OTT streaming platforms ("Because You Watched" recommendations)
- News/article similarity suggestions
- E-commerce: similar product recommendations
- Any application requiring content-based similarity matching

---

> _For questions or contributions, please refer to the main project repository: [Amazon-FireStick-recommendation-modal-prototype](https://github.com/yash21755/Amazon-FireStick-recommendation-modal-prototype)_
