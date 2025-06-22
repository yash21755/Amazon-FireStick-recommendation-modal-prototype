from flask import Flask, request, jsonify
from flask_cors import CORS
from watch_recommendations import recommend_content
from fullcontext import get_context
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/api/recommend", methods=["POST"])
def recommend():
    try:
        context = request.get_json(force=True)
        df = recommend_content(context)
        recs = format_recommendations(df)
        return jsonify(recs)
    except Exception as e:
        print("Error in /api/recommend:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/recommend/test", methods=["GET"])
def test_recommend():
    context = get_context()
    df = recommend_content(context)
    recs = format_recommendations(df)
    return jsonify(recs)

def format_recommendations(df):
    """
    Format the DataFrame to match the frontend's expected structure.
    """
    recommendations = []

    for idx, row in df.iterrows():
        title = str(row.get("series_title") or row.get("name") or "Untitled").strip()
        year = str(row.get("released_year") or row.get("year") or "Unknown").strip()
        image_link = str(row.get("poster_link") or row.get("image-src") or "").strip()

        # Clean poster URL
        clean_img = image_link.replace("_V1_.*.jpg", "_V1_.jpg") if "_V1_" in image_link else image_link

        rec = {
            "id": f"{title}-{year}-{idx}",
            "title": title,
            "description": row.get("overview") or row.get("description") or "No description available."
        }

        recommendations.append(rec)

    return recommendations

if __name__ == "__main__":
    app.run(debug=True, port=5000)
