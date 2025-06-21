from flask import Flask, jsonify, request
from flask_cors import CORS
from pytrends.request import TrendReq

app = Flask(__name__)
CORS(app)

@app.route("/api/trends", methods=["POST"])
def get_trends():
    data = request.json
    movies = data.get("movies", [])  # Expecting a list of dicts with Series_Title and No_of_Votes

    # Build a trend dictionary using No_of_Votes as watch count
    trends = {}
    for movie in movies:
        title = movie.get("Series_Title")
        try:
            votes = int(movie.get("No_of_Votes", 0))
        except:
            votes = 0
        if title:
            trends[title] = votes

    return jsonify(trends)

if __name__ == "__main__":
    app.run(port=5002)
