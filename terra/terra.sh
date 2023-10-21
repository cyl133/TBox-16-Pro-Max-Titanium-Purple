#!/bin/bash

# Source the .env file to get the DEV_ID and API_KEY
source .env

# Make the curl request using the environment variables
curl --request POST \
     --url https://api.tryterra.co/v2/auth/generateWidgetSession \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header "dev-id: $DEV_ID" \
     --header "x-api-key: $TERRA_API_KEY" \
     --data '
{
  "providers": "GARMIN,WITHINGS,FITBIT,GOOGLE,OURA,WAHOO,PELOTON,ZWIFT,TRAININGPEAKS,FREESTYLELIBRE,DEXCOM,COROS,HUAWEI,OMRON,RENPHO,POLAR,SUUNTO,EIGHT,APPLE,CONCEPT2,WHOOP,IFIT,TEMPO,CRONOMETER,FATSECRET,NUTRACHECK,UNDERARMOUR",
  "language": "en"
}
'
