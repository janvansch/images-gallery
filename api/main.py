import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

gallery = mongo_client.gallery  # The database
images_collection = gallery.images  # The collection in the database

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
    return "Hello from Flask!"


@app.route("/new-image")  # Only GET is allowed
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, params=params, headers=headers)
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST"])  # Only GET and POST are allowed
def images():
    if request.method == "GET":
        # Read images from DB
        images = images_collection.find({})  # Returns a cursor
        return jsonify(
            [img for img in images]
        )  # Traverse cursor and create img list and then return it in JSON format
    if request.method == "POST":
        # Save image to DB
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        # delete image from the database
        result = images_collection.delete_one({"id": image_id})
        if result:
            if result.deleted_count == 1:
                return {"deleted_id": image_id}
            return {"error": "Image not found"}, 404
        return {"error": "Image was not deleted, please try again"}, 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
