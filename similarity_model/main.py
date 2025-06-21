from scripts.similarity_model import recommend_similar_movies
import os

def main():
    db_path = os.path.join("database", "updated_movie_dataset.csv")
    ref, sims = recommend_similar_movies(db_path)
    print(f"\n🎯 Reference Movie: {ref}")
    print("\n🎬 Top 10 Similar Movies:\n", sims.to_string(index=False))

if __name__ == "__main__":
    main()
