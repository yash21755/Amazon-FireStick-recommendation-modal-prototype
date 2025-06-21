import pandas as pd
from fullcontext import get_context
from collections import Counter
from datetime import datetime, timedelta
import heapq

def parse_sleep_time(sleep_time_str):
    try:
        fmt = "%H:%M"
        datetime.strptime(sleep_time_str, fmt)
        return sleep_time_str
    except:
        return "23:59"

def is_within_sleep_limit(length, now, sleep):
    fmt = "%H:%M"
    try:
        c = datetime.strptime(now, fmt)
        s = datetime.strptime(sleep, fmt)
        if s <= c: s += timedelta(days=1)
        return c + timedelta(minutes=length) <= s
    except:
        return True

def get_top_genres(file="past_behaviour.csv", top_k=1):
    try:
        df = pd.read_csv(file)
        df.columns = df.columns.str.lower().str.strip()
        if "genre" not in df: return []
        allgs = (
            df["genre"]
            .dropna()
            .str.lower()
            .str.split(", ")
            .explode()
        )
        return [g for g,_ in Counter(allgs).most_common(top_k)]
    except:
        return []

def recommend_content(context, csv_file="content_data.csv", behavior_file="past_behaviour.csv", top_n=15):
    df = pd.read_csv(csv_file)
    df.columns = df.columns.str.lower().str.strip()
    for col in ("mood","time_of_day","weather","genre"):
        if col in df: df[col] = df[col].astype(str).str.lower()

    pref = get_top_genres(behavior_file)
    emo  = context.get("emotion","").lower()
    tod  = context.get("time_of_day","").lower()
    wea  = context.get("weather","").lower()
    tmp  = context.get("temperature","")
    cur  = context.get("current_time","22:00")
    slp  = parse_sleep_time(context.get("sleep_time","23:59"))

    try:
        temp_val = float(tmp)
        temp_ok  = True
    except:
        temp_val = None
        temp_ok  = False

    if "total_length" in df:
        df["total_length"] = pd.to_numeric(df["total_length"], errors="coerce")
        df = df[df["total_length"].apply(lambda L: is_within_sleep_limit(L,cur,slp))]

    def score(r):
        s = 0.0
        try:
            imdb = float(r.get("imdb_rating",0)) if not pd.isna(r.get("imdb_rating")) else 0
            votes= int(r.get("no_of_votes",0)) if not pd.isna(r.get("no_of_votes")) else 0
            s = imdb*0.35 + (votes/100000)*0.2
            for g in pref:
                if g in str(r.get("genre","")).lower():
                    s += 0.8
                    break
            if r.get("mood","")==emo:
                s += 0.6
        except:
            pass
        return s

    filters = [
      ["mood","time_of_day","weather","temperature"],
      ["mood","time_of_day","weather"],
      ["mood","time_of_day"],
      ["mood"],
      []
    ]

    for f in filters:
        sub = df.copy()
        if "mood" in f:         sub = sub[sub["mood"]==emo]
        if "time_of_day" in f:  sub = sub[sub["time_of_day"]==tod]
        if "weather" in f:      sub = sub[sub["weather"]==wea]
        if "temperature" in f and temp_ok and "temperature" in sub:
            try:
                sub = sub[sub["temperature"].astype(float)<=temp_val+2]
            except:
                pass
        if tod=="night" and "total_length" in sub:
            short = sub[sub["total_length"]<=120]
            if not short.empty: sub = short

        if sub.empty: continue

        heap = []
        for _,row in sub.iterrows():
            sc = score(row)
            if len(heap)<top_n:
                heapq.heappush(heap,(sc,row))
            else:
                heapq.heappushpop(heap,(sc,row))

        out = []
        for sc,row in sorted(heap, key=lambda x:x[0], reverse=True):
            d = row.to_dict()
            d["score"] = sc
            for k,v in d.items():
                if isinstance(v,(float,)) and pd.isna(v):
                    d[k] = None
            out.append(d)
        return pd.DataFrame(out)

    return pd.DataFrame()

if __name__ == "__main__":
    # Example CLI test
    import json
    context = get_context() if callable(get_context) else {}
    print("Sample context:", json.dumps(context, indent=2))
    df = recommend_content(context)
    print("\nTop recommendations:")
    if not df.empty:
        print(df.head(5).to_string(index=False))
    else:
        print("No recommendations found.")
