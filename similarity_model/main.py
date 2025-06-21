from flask import Flask, jsonify
from flask_cors import CORS
from scripts.similarity_model import recommend_similar_movies
import os

app = Flask(__name__)
CORS(app)

@app.route("/api/similiar", methods=["GET"])
def get_trending_recommendations():
    db_path = os.path.join("database", "updated_movie_dataset.csv")
    reference_title, similar_df = recommend_similar_movies(db_path)

    if similar_df is None or similar_df.empty:
        return jsonify({"reference": reference_title or "", "similar": []})

    # Format like your frontend expects
    recommendations = []
    for idx, row in similar_df.iterrows():
        title = row["Series_Title"].strip()
        year = str(row.get("Released_Year", "Unknown")).strip()
        image_link = row.get("Poster_Link", "").strip()

        rec = {
            "id": f"{title}-{year}",
            "title": title,
            "img": image_link.replace("_V1_.*.jpg", "_V1_.jpg"),
            "Image-src": image_link,
            "rating": float(row.get("IMDB_Rating", 0)),
            "Year": year,
            "description": row.get("Genre", "No description"), 
        }
        recommendations.append(rec)

    return jsonify({
        "reference": reference_title,
        "similar": recommendations
    })


if __name__ == "__main__":
    app.run(port=5001, debug=True)
