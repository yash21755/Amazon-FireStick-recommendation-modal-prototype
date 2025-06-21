import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime, timedelta
import os

CATEGORY_COLUMNS = ['Drama', 'Thriller', 'Action', 'Romance', 'Comedy', 'Horror', 'SciFi', 'Fictional']

def load_dataset(database_path):
    df = pd.read_csv(database_path)
    df['watch_date'] = pd.to_datetime(df['watch_date'], errors='coerce')
    return df

def get_top_watched_movie(df):
    recent_df = df[df['watch_date'] >= datetime.now() - timedelta(days=15)].copy()
    recent_df['watch_factor'] = recent_df['watch_time'] / recent_df['total_length']
    return recent_df.loc[recent_df['watch_factor'].idxmax()]

def compute_similarities(reference_vector, all_vectors):
    return cosine_similarity([reference_vector], all_vectors)[0]

def find_top_similar(df, reference_row, top_n=10):
    df = df.copy()
    df['similarity'] = compute_similarities(reference_row[CATEGORY_COLUMNS].values, df[CATEGORY_COLUMNS].values)
    df = df[df['Series_Title'] != reference_row['Series_Title']]
    return df.sort_values('similarity', ascending=False).head(top_n)

def recommend_similar_movies(database_path):
    df = load_dataset(database_path)
    reference = get_top_watched_movie(df)
    top_similar = find_top_similar(df, reference)
    return reference['Series_Title'], top_similar[['Series_Title', 'similarity']]
