import pandas as pd
from fullcontext import get_context
from collections import Counter

def get_top_genres(behavior_file="past_behaviour.csv", top_k=1):
    try:
        df = pd.read_csv(behavior_file)
        df.columns = df.columns.str.strip().str.lower()
        if 'genre' in df.columns:
            genres = df['genre'].dropna().astype(str).str.lower().str.split(', ')
            genre_list = [g for sublist in genres for g in sublist]
            top_genres = [genre for genre, _ in Counter(genre_list).most_common(top_k)]
            return top_genres
    except Exception as e:
        print(f"⚠️ Could not read past behaviour: {e}")
    return []

def recommend_content(context, csv_file="content_data.csv", behavior_file="past_behaviour.csv", top_n=15):
    df = pd.read_csv(csv_file)
    df.columns = df.columns.str.strip().str.lower()

    # Normalize string columns
    for col in ['mood', 'time_of_day', 'weather', 'genre']:
        if col in df.columns:
            df[col] = df[col].astype(str).str.lower()

    # Get top genre(s) from past behavior
    preferred_genres = get_top_genres(behavior_file)

    # Extract context values safely
    emotion = context.get('emotion', '').lower()
    time_of_day = context.get('time_of_day', '').lower()
    weather = context.get('weather', '').lower()
    temperature_str = context.get('temperature', 'Unknown')

    try:
        temperature = float(temperature_str)
        temperature_known = True
    except ValueError:
        temperature = None
        temperature_known = False

    if 'total_length' in df.columns:
        df['total_length'] = pd.to_numeric(df['total_length'], errors='coerce')

    # Define scoring function with genre preference bonus
    def calculate_score(row):
        try:
            imdb = float(row.get('imdb_rating', 0)) if not pd.isna(row.get('imdb_rating')) else 0
            meta = float(row.get('meta_score', 0)) / 10 if not pd.isna(row.get('meta_score')) else 0
            votes = int(row.get('no_of_votes', 0)) if not pd.isna(row.get('no_of_votes')) else 0
            base_score = imdb * 0.5 + meta * 0.3 + (votes / 100000) * 0.2

            # Boost score if genre matches user preference
            genre = str(row.get('genre', '')).lower()
            for pref_genre in preferred_genres:
                if pref_genre in genre:
                    base_score += 0.5  # Boost value can be adjusted
                    break
            return base_score
        except:
            return 0.0

    # Filter using fallback logic
    filters = [
        ['mood', 'time_of_day', 'weather', 'temperature'],
        ['mood', 'time_of_day', 'weather'],
        ['mood', 'time_of_day'],
        ['mood'],
        []  # fallback to all
    ]

    for f in filters:
        filtered = df.copy()
        if 'mood' in f:
            filtered = filtered[filtered['mood'] == emotion]
        if 'time_of_day' in f:
            filtered = filtered[filtered['time_of_day'] == time_of_day]
        if 'weather' in f:
            filtered = filtered[filtered['weather'] == weather]
        if 'temperature' in f and temperature_known and 'temperature' in df.columns:
            try:
                filtered = filtered[filtered['temperature'].astype(float) <= temperature + 2]
            except:
                pass

        # Prefer short-form content after 10 PM
        if time_of_day == 'night' and 'total_length' in filtered.columns:
            short_form = filtered[filtered['total_length'] <= 120]
            if not short_form.empty:
                filtered = short_form

        if not filtered.empty:
            filtered['score'] = filtered.apply(calculate_score, axis=1)
            filtered = filtered.sort_values(by='score', ascending=False)
            return filtered.head(top_n)[['series_title', 'genre', 'imdb_rating', 'score']]

    return pd.DataFrame()

# ===== MAIN =====
if __name__ == "__main__":
    context = get_context()
    print("\n📊 Final Context Used for Recommendation:")
    for key, value in context.items():
        print(f"{key.capitalize()}: {value}")

    recommendations = recommend_content(context)

    print("\n🎬 Top Recommendations:")
    if not recommendations.empty:
        for idx, row in recommendations.iterrows():
            print(f"{row['series_title']} | {row['genre']} | IMDb: {row['imdb_rating']} | Score: {row['score']:.2f}")
    else:
        print("No recommendations found. Please adjust the filters")
