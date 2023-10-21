// Import the necessary modules using ES6 import syntax
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // No need for dynamic import with ESM

const app = express();
const port = 3000;


app.use(bodyParser.json());

let checkinTimer = null;
let checkinInterval = 1000 * 10; // e.g., 10 seconds
let nextCheckinTime = null; // This variable holds the next check-in timestamp

// Function to handle the check-in event
function handleCheckIn() {
    console.log('Check-in time!');
    // Implement what happens during check-in, e.g., send notifications, summary, reminders, etc.

    // After handling, reset the timer for the next check-in
    resetCheckinTimer();
}

// Reset the global check-in timer and update the next check-in time
function resetCheckinTimer(newInterval = checkinInterval) {
    if (checkinTimer) {
        clearTimeout(checkinTimer); // Clear the existing timer
    }

    checkinInterval = newInterval; // Update the interval if a new one is provided

    // Set the next check-in time
    nextCheckinTime = Date.now() + checkinInterval;

    // Set a new timer
    checkinTimer = setTimeout(handleCheckIn, checkinInterval); // Call the check-in handler when the timer expires
}

// Endpoint to update the check-in timer
app.post('/update-timer', (req, res) => {
    const { newInterval } = req.body;

    if (!newInterval || typeof newInterval !== 'number') {
        return res.status(400).send('Invalid interval data.');
    }

    // Reset the timer with the new interval
    resetCheckinTimer(newInterval);

    res.send('Timer updated.');
});

// New endpoint to get the remaining check-in time
app.get('/checkin-time-remaining', (req, res) => {
    if (!nextCheckinTime) {
        return res.status(200).send('Timer is not set.');
    }

    const currentTime = Date.now();
    const timeRemaining = nextCheckinTime - currentTime;

    res.status(200).json({ timeRemaining: `${timeRemaining} milliseconds` });
});

////////////////////////////////////////////////////////////////////////////////////////////////
let issues = []; // In-memory store for issues

async function getIssuesFromRepo(owner, repo) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;
    const response = await fetch(url);
    const data = await response.json();

    // If the response includes an error, throw it
    if (data.message) {
        throw new Error(data.message);
    }

    return data;
}

async function addIssueToSystem(issue) {
    // Assuming the issue contains the properties 'title', 'number', and 'state'
    const newIssue = {
        issue_title: issue.title,
        issue_number: issue.number,
        issue_state: issue.state,
        // Add more fields as needed, and initialize your timer properties
        is_timer_on: false,
        remainingTime: 0, // or a default time if you prefer
        timer: null,
        // ... any other properties needed for your timer
    };

    issues.push(newIssue); // Adds the new issue to the in-memory store
}

async function importIssuesToSystem(owner, repo) {
    try {
        const issuesFromRepo = await getIssuesFromRepo(owner, repo);

        for (const issue of issuesFromRepo) {
            await addIssueToSystem(issue);
        }

        console.log(`Imported ${issuesFromRepo.length} issues.`);
    } catch (error) {
        console.error('Error importing issues:', error);
    }
}

// Endpoint to view issues stored in memory
app.get('/get_issues', (req, res) => {
    res.json(issues);
});



// Helper functions for timer management

function getRemainingTime(issue) {
    if (issue.is_timer_on) {
        const elapsed = Date.now() - issue.startTime;
        return issue.originalTime - elapsed; // Calculate remaining time
    }
    return issue.remainingTime;
}

function startIssueTimer(issue) {
    if (issue.is_timer_on) {
        return;  // Timer already running
    }

    issue.is_timer_on = true;
    issue.startTime = Date.now(); // Save the start time
    issue.originalTime = issue.remainingTime; // Store the original duration

    // Set the timer for the issue
    issue.timer = setTimeout(() => {
        console.log(`Time's up for issue number ${issue.issue_number}.`);
        issue.is_timer_on = false;
        issue.startTime = null;
        issue.remainingTime = 0; // No time remaining
        // Here, you can add more actions, like sending notifications
    }, issue.remainingTime);
}

function stopIssueTimer(issue) {
    if (!issue.is_timer_on) {
        return;  // Timer not running
    }

    clearTimeout(issue.timer); // Clear the timer

    issue.remainingTime = getRemainingTime(issue); // Update remaining time
    issue.is_timer_on = false;
    issue.timer = null;
    issue.startTime = null;
}

function prepareIssueForResponse(issue) {
    const issueCopy = { ...issue };

    // Remove the timer object and update the remainingTime dynamically
    delete issueCopy.timer;
    issueCopy.remainingTime = getRemainingTime(issue);

    return issueCopy;
}

// Routes for issue management

app.get('/get_issues', (req, res) => {
    // Prepare issues for response
    const responseIssues = issues.map(prepareIssueForResponse);
    res.json(responseIssues);
});

app.post('/add_issue', (req, res) => {
    const { issue_title, issue_number, issue_state } = req.body;

    if (!issue_title || issue_number == null || !issue_state) {
        return res.status(400).send('Missing required issue information');
    }

    const newIssue = {
        issue_title,
        issue_number,
        issue_state,
        startTime: null,
        originalTime: 1000 * 60 * 5, // Defaulting to 5 minutes
        remainingTime: 1000 * 60 * 5, // Defaulting to 5 minutes
        timer: null,
        is_timer_on: false,
    };

    issues.push(newIssue);
    res.status(201).send('Issue added successfully');
});

app.post('/edit_issue', (req, res) => {
    const { issue_number, time } = req.body;
    const issue = issues.find(i => i.issue_number === issue_number);

    if (issue) {
        // Ensure the timer is not running when editing
        if (issue.is_timer_on) {
            stopIssueTimer(issue);
        }
        issue.originalTime = time;
        issue.remainingTime = time; // Update the remaining time for this issue
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

app.post('/stop_timer', (req, res) => {
    const { issue_number } = req.body;
    const issue = issues.find(i => i.issue_number === issue_number);

    if (issue) {
        stopIssueTimer(issue);
        res.json({ issue_number: issue.issue_number, is_timer_on: false });
    } else {
        res.status(404).send('Issue not found');
    }
});

function disableOtherTimers(issueNumber) {
    issues.forEach(issue => {
        if (issue.issue_number !== issueNumber && issue.is_timer_on) {
            stopIssueTimer(issue); // This uses the stopIssueTimer function from before
        }
    });
}

app.post('/start_timer', (req, res) => {
    const { issue_number } = req.body;
    const issue = issues.find(i => i.issue_number === issue_number);

    if (issue) {
        disableOtherTimers(issue_number);  // Disable all other timers
        startIssueTimer(issue);  // Then start the timer for the current issue
        res.json({ issue_number: issue.issue_number, is_timer_on: true });
    } else {
        res.status(404).send('Issue not found');
    }
});

// Middleware to parse JSON payloads
app.use(express.json());

// POST route for GitHub webhooks
app.post('/webhook', (req, res) => {
    // Respond that the webhook was received successfully
    res.status(202).send('Accepted');

    // Determine the type of event from GitHub
    const githubEvent = req.headers['x-github-event'];
    const action = req.body.action;
    const data = req.body;

    // Handle different events and actions accordingly
    if (githubEvent === 'issues') {
        if (action === 'opened') {
            console.log(`An issue was opened with this title: ${data.issue.title}`);
        }
    }
});


// Start the server and import issues
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    importIssuesToSystem('bitcoin', 'bitcoin');
});