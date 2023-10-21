import requests
import dotenv
import os

dotenv.load_dotenv()

url = "https://api.tryterra.co/v2/body?user_id=f4c3c72a-cea2-43b5-80bc-6bed550eb0f8&start_date=2022-10-01&end_date=2023-10-01&to_webhook=true&with_samples=true"

dev_id = os.getenv('DEV_ID')
x_api_key = os.getenv('TERRA_API_KEY')

headers = {
    "accept": "application/json",
    "dev-id": dev_id,
    "x-api-key": x_api_key
}

response = requests.get(url, headers=headers)

print(response.text)