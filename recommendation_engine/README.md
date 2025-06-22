# Recommendation Engine

An AI-powered, modular backend system for generating personalized content recommendations. This engine leverages machine learning models and contextual data (user behavior, tone, mood, past history, etc.) to deliver highly relevant suggestions. Designed for extensibility and integration with OTT platforms, news feeds, e-commerce personalization, and more.

---

## 📦 Folder Context

This folder contains all backend logic, model-serving code, and API endpoints for the recommendation engine. It exposes RESTful APIs for consumption by frontend clients or other microservices.

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yash21755/Amazon-FireStick-recommendation-modal-prototype.git
   cd Amazon-FireStick-recommendation-modal-prototype/recommendation_engine
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

- **Type:** Content-Based Filtering with contextual scoring.
- **Features:** Uses user mood, tone, time-of-day, weather, temperature, and past behavior to rank and filter content.
- **Training:** Models can be trained using scripts in this folder (see `model.py` for audio emotion model).
- **Inference:** Main API endpoints serve recommendations in real-time based on incoming context.
- **Custom Logic:** Includes custom scoring, filtering, and fallback strategies for robust recommendations.

---

## 📝 Input Parameters

Recommendations are generated based on a combination of the following parameters (passed via JSON in POST requests):

| Parameter         | Type      | Description                                               |
|-------------------|-----------|-----------------------------------------------------------|
| `tone_score`      | float     | Sentiment/tone score (0–1)                                |
| `emotion`         | string    | Detected emotion (e.g., "happy", "sad", "neutral")        |
| `time_of_day`     | string    | Time context ("morning", "afternoon", "night", etc.)      |
| `weather`         | string    | Weather context ("sunny", "rainy", etc.)                  |
| `temperature`     | float     | Current temperature (Celsius)                             |
| `sleep_time`      | string    | User's set sleep time (e.g., "23:30")                     |
| `watch_history`   | list      | List of previously watched items                          |
| `user_preferences`| object    | Genres, engagement patterns, etc.                         |

**Example JSON payload:**
```json
{
  "tone_score": 0.85,
  "emotion": "happy",
  "time_of_day": "evening",
  "weather": "cloudy",
  "temperature": 22,
  "sleep_time": "23:30",
  "watch_history": ["The Office", "Breaking Bad"],
  "user_preferences": { "genres": ["comedy", "drama"] }
}
```

---

## 🔗 API Endpoints

### `POST /api/recommend`
- **Description:** Get personalized recommendations based on provided context.
- **Request Body:** JSON (see above)
- **Response:**
  ```json
  {
    "recommendations": [
      {
        "id": "The Office-2005-0",
        "title": "The Office",
        "description": "A mockumentary on a group of typical office workers...",
        "score": 3.42
      },
      ...
    ],
    "emotion": "happy",
    "time_of_day": "evening",
    "weather": "cloudy",
    "temperature": 22
  }
  ```
- **Authentication:** Not required (by default)

### `GET /api/recommend/test`
- **Description:** Get recommendations using auto-detected or default context.
- **Response:** Same as above.

---

## ⚙️ Environment Variables

| Variable      | Description                              | Example Value         |
|---------------|------------------------------------------|----------------------|
| `MODEL_PATH`  | Path to serialized model (if used)       | `models/model.pkl`   |
| `PORT`        | Port to run the server                   | `5000`               |
| `DEBUG`       | Debug mode (`True`/`False`)              | `True`               |
| `LOG_LEVEL`   | Logging level                            | `INFO`               |

**Sample `.env.example`:**
```env
MODEL_PATH=models/model.pkl
PORT=5000
DEBUG=True
LOG_LEVEL=INFO
```

---

## ▶️ Running the Server

**Development:**
```bash
python recommendation_api.py
# By default runs on http://localhost:5000
```

**Production (example with Gunicorn):**
```bash
gunicorn -w 4 -b 0.0.0.0:5000 recommendation_api:app
```

**Docker (if supported):**
```bash
docker build -t recommendation-engine .
docker run -p 5000:5000 --env-file .env recommendation-engine
```

---

## 📁 Folder Structure

```
recommendation_engine/
├── models/                   # Model files and pickles (e.g., model.pkl)
├── routes/                   # API endpoint definitions (if modularized)
├── utils/                    # Helper and preprocessing functions
├── content_data.csv          # Main content dataset
├── past_behaviour.csv        # User behavior/history dataset
├── model.py                  # Model training and serialization script
├── recommendation_api.py     # Main API server (Flask)
├── watch_recommendations.py  # Recommendation logic
├── fullcontext.py            # Context extraction logic
├── test.py                   # Model testing script
├── requirements.txt          # Python dependencies
└── README.md                 # This file
```

---

## 🧪 Testing

- **Unit/Integration Tests:**  
  Place test scripts in a `tests/` folder or use `test.py` for model validation.
- **Run tests with:**
  ```bash
  pytest tests/
  # or
  python test.py
  ```
- **Tools:**  
  [pytest](https://docs.pytest.org/), [unittest](https://docs.python.org/3/library/unittest.html)

---

## 🚀 Deployment & Hosting

- **Local:**  
  Runs on `http://localhost:5000` by default.
- **Production:**  
  Deploy with Gunicorn, Docker, or any WSGI-compatible server.
- **REST Endpoints:**  
  Exposed for consumption by frontend or other services.

---

## 📚 Real-World Use Cases

- OTT streaming platforms (personalized movie/series recommendations)
- News feed optimization (contextual article suggestions)
- E-commerce (product recommendations based on mood, time, and behavior)
- Any application requiring dynamic, context-aware content curation

---

> _For questions or contributions, please refer to the main project repository: [Amazon-FireStick-recommendation-modal-prototype](https://github.com/yash21755/Amazon-FireStick-recommendation-modal-prototype)_

