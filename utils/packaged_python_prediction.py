import sys
from complexity import complexity_prediction, NewData

def main(title, description, stress):
    # Create a NewData object with the command-line arguments
    issue_data = NewData(title=title, description=description, stress=stress)

    # Get the prediction response using the complexity_prediction function
    response = complexity_prediction(issue_data)

    # Print the response so that the calling process (Node.js server) can read it
    print(response.content, flush=True)

# Entry point of the script
if __name__ == "__main__":
    # Check to ensure proper command-line arguments have been passed
    if len(sys.argv) < 4:
        print("Error: Not enough arguments provided.")
        sys.exit(1)

    # Unpack the command-line arguments into variables
    _, title, description, stress = sys.argv  # The first argument is the script name, so we disregard it

    # Call the main function with the command-line arguments
    main(title, description, stress)
