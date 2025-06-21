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
        recs = df.to_dict(orient="records")
        return jsonify(recs)
    except Exception as e:
        print("Error in /api/recommend:", e)
        return jsonify({"error": str(e)}), 500

@app.route("/api/recommend/test", methods=["GET"])
def test_recommend():
    context = get_context()
    df = recommend_content(context)
    return jsonify(df.to_dict(orient="records"))

if __name__=="__main__":
    app.run(debug=True, port=5000)
