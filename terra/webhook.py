import logging
import flask
from flask import request
from terra.base_client import Terra
import os
import dotenv

dotenv.load_dotenv()

logging.basicConfig(level=logging.INFO)
_LOGGER = logging.getLogger("app")

terra = Terra(api_key=os.getenv("TERRA_API_KEY"), dev_id=os.getenv('DEV_ID'), secret=os.getenv('TERRA_SECRET'))

app = flask.Flask(__name__)

@app.route("/consumeTerraWebhook", methods=["POST"])
def consume_terra_webhook() -> flask.Response:
    # body_str = str(request.get_data(), 'utf-8')
    body = request.get_json()
    print(body)
    _LOGGER.info(
        "Received webhook for user %s of type %s",
        body.get("user", {}).get("user_id"),
        body["type"])
    verified = terra.check_terra_signature(request.get_data().decode("utf-8"), request.headers['terra-signature'])
    if verified:
      return flask.Response(status=200)
    else:
      return flask.Response(status=403)
    
    
if __name__ == "__main__":
    app.run(host="localhost", port=8080)