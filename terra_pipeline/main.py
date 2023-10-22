import logging
import flask
from flask import request
from terra.base_client import Terra
import os
import dotenv
from call_webhook import get_new_info
import json
from utilsML import run_ml_pipeline
from ml.pipeline import run_ml_pipeline

dotenv.load_dotenv()

logging.basicConfig(level=logging.INFO)
_LOGGER = logging.getLogger("app")

FILE_NAME = "last_data.json"

terra = Terra(api_key=os.getenv("TERRA_API_KEY"), dev_id=os.getenv('DEV_ID'), secret=os.getenv('TERRA_SECRET'))

app = flask.Flask(__name__)

@app.route("/consumeTerraWebhook", methods=["POST"])
def consume_terra_webhook() -> flask.Response:
    # body_str = str(request.get_data(), 'utf-8')
    body = request.get_json()
    request_type = body.get("type")
    if request_type == "healthcheck":
        # Append the data to 'last_data.json'
        new_data = get_new_info()
        new_data_json = new_data.json()["data"][-1]

        with open(FILE_NAME, 'w') as file:
            json.dump(new_data_json, file)
            file.write("\n")  # Separate each data entry by a new line for better readability


    _LOGGER.info(
        "Received webhook for user %s of type %s",
        body.get("user", {}).get("user_id"),
        body["type"])
    verified = terra.check_terra_signature(request.get_data().decode("utf-8"), request.headers['terra-signature'])
    if verified:
      return flask.Response(status=200)
    else:
      return flask.Response(status=403)
    
@app.route("/runMLPipeline", methods=["GET"])
def run_ml_model():
    try:
        with open(FILE_NAME, 'r') as file:
            data = json.load(file)
            
        results = run_ml_pipeline(data)
        return flask.jsonify(results)
    except Exception as e:
        _LOGGER.error(f"Error running ML model: {e}")
        return flask.Response(status=500, response="Internal Server Error")
    
    
if __name__ == "__main__":
    app.run(host="localhost", port=8080)