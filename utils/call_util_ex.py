from complexity import complexity_prediction, NewData
import json

json_string = '{"title": "page is not loading", "description": "page is stuck on loop. After awhile I get a time out request. The server seems to be running", "stress": "medium stress"}'
data = NewData.parse_raw(json_string)

# Test the function with a sample NewData object
# test_data = NewData(title="page is not responding", description="The page freezes every time I try to submit the form.", stress="high stress")

response = complexity_prediction(data)

print(response)
