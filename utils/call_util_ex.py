from complexity import complexity_prediction, NewData

# Test the function with a sample NewData object
test_data = NewData(title="page is not responding", description="The page freezes every time I try to submit the form.", stress="high stress")

response = complexity_prediction(test_data)

print(response)
