import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "http://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
MODE = os.environ.get("MODE", "")

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "UNSPLASH access key required! (.env.local file with UNSPLASH_KEY)"
    )

app = Flask(__name__)
CORS(app)

# Set debug if in development mode
app.config["DEBUG"] = True if MODE == "dev" else False


@app.route("/")
def hello():
    return "From Flask on RPi: Hello, World!"


@app.route("/new-image")  # only GET is allowed
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, params=params, headers=headers)

    data = response.json()
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
