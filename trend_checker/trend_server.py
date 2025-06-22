from flask import Flask, jsonify
from flask_cors import CORS
import csv

app = Flask(__name__)
CORS(app)

@app.route("/api/trends", methods=["GET","POST"])
def get_trends():
    trends = {}

    try:
        with open("movie_database.csv", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                title = row.get("Series_Title", "").strip()
                try:
                    votes = int(row.get("No_of_Votes", "0").replace(",", ""))
                except ValueError:
                    votes = 0
                if title:
                    trends[title] = votes
    except FileNotFoundError:
        return jsonify({"error": "movie_database.csv not found"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify(trends)

if __name__ == "__main__":
    app.run(port=5002)
