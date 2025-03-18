from flask import Flask, jsonify, render_template
import csv
import random
 
app = Flask(__name__)
 
# Load songs from CSV file
def load_songs():
    songs = []
    with open("top_100_songs_2024.csv", mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            songs.append({"title": row["Title"], "artist": row["Artist"]})
    return songs
 
# Flask route to return ALL songs for animation
@app.route('/get_all_songs')
def get_all_songs():
    return jsonify({"songs": load_songs()})
 
# Flask route to return ONE random song
@app.route('/get_random_track')
def get_random_track():
    song = random.choice(load_songs())
    return jsonify({"title": song["title"], "artist": song["artist"]})
 
@app.route('/')
def home():
    return render_template("index.html")
 
if __name__ == '__main__':
    app.run(debug=True)