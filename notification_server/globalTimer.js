import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Global check-in timer
let checkinTimer = null;
const checkinInterval = 1000 * 60 * 10; // e.g., 10 minutes

// Reset the global check-in timer
function resetCheckinTimer() {
    if (checkinTimer) {
        clearTimeout(checkinTimer); // Clear the existing timer
    }

    // Set a new timer
    checkinTimer = setTimeout(() => {
        console.log('Check-in time!');
        // Implement what happens during check-in, e.g., send notifications, summary, reminders, etc.
    }, checkinInterval);
}

// Fetch new commits and determine if they're associated with issues
async function fetchAndProcessCommits() {
    // Note: This function should be triggered by a real event, like a webhook, indicating new commits.
    // We're simplifying here by manually calling it. You'd need repository-specific logic here.

    try {
        // This URL is just a placeholder; you'll need to construct the actual URL based on your repo.
        const response = await fetch('https://api.github.com/repos/bitcoin/bitcoin/commits');
        const commits = await response.json();

        // Process the commits to find related issues (this is a simplified representation)
        commits.forEach(commit => {
            // Dummy check: you'd need logic to link commits to issues, perhaps via commit messages.
            if (commit.message.includes('#')) {
                console.log(`New commit for an issue found: ${commit.sha}`);
                resetCheckinTimer(); // Reset the timer if we determine this commit is related to an issue
            }
        });
    } catch (error) {
        console.error('Failed to fetch commits:', error);
    }
}

// Simulate the webhook or event-trigger by using an endpoint for demonstration purposes
app.post('/simulate-new-commit', (req, res) => {
    console.log('Received a simulated commit.');
    fetchAndProcessCommits(); // In real use, this would be invoked by a true system event, not an endpoint.
    res.send('Processed simulated commit.');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    resetCheckinTimer(); // Initialize the check-in timer
});