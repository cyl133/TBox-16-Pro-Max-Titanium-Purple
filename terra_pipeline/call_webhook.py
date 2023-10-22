import requests
import dotenv
import os
from datetime import datetime, timedelta

dotenv.load_dotenv()

# Calculate dynamic start and end dates
end_date = datetime.today() 
start_date = end_date - timedelta(days=7)

# Convert dates to string format
end_date_str = end_date.strftime('%Y-%m-%d')
start_date_str = start_date.strftime('%Y-%m-%d')

print(end_date_str, start_date_str)

base_url = "https://api.tryterra.co/v2/sleep?user_id=cd611c70-e5d9-459f-8a9e-0f0238dcd370"
url = f"{base_url}&start_date={start_date_str}&end_date={end_date_str}&to_webhook=false&with_samples=true"

dev_id = os.getenv('DEV_ID')
x_api_key = os.getenv('TERRA_API_KEY')

headers = {
    "accept": "application/json",
    "dev-id": dev_id,
    "x-api-key": x_api_key
}

def get_new_info():
    return requests.get(url, headers=headers)

