// Import the necessary modules using ES6 import syntax
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch'; // No need for dynamic import with ESM
import {spawn} from "child_process";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3000;
const owner = 'cyl133';
const repo = 'HackHarvard2023';
// Middleware to parse JSON payloads
app.use(express.json());


app.use(bodyParser.json());

let checkinTimer = null;
let checkinInterval = 1000 * 10; // e.g., 10 seconds
let nextCheckinTime = null; // This variable holds the next check-in timestamp
let timeMap = { "easy": 1000 * 10,"medium": 2000 * 10, "hard": 3000 * 10};

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

     // Update the interval if a new one is provided
    checkinInterval = newInterval;

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

async function getIssuesFromRepo(owner, repo, token) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;

    // Include the token in the request headers
    const headers = {
        'Authorization': `token ${token}`,
        'User-Agent': 'request',  // 'User-Agent' header is often required by the GitHub API, you can put anything here
    };

    const response = await fetch(url, { headers });
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
        originalTime: timeMap[issue.difficulty], // Defaulting to 5 minutes
        remainingTime: timeMap[issue.difficulty], // Defaulting to 5 minutes
        startTime: null,
        timer: null,
        is_confirmed: false,
        difficulty: issue.difficulty,
        stressLevel: issue.stressLevel
    };
    issues.push(newIssue); // Adds the new issue to the in-memory store
}

async function importIssuesToSystem(owner, repo, token) {
    try {
        const issuesFromRepo = await getIssuesFromRepo(owner, repo, token);
        const response = await axios.get('http://localhost:8080/runMLPipeline');
        const stressLevel = response.data.stress;
        for (const issue of issuesFromRepo) {
            // Wrap the script execution in a promise so we can await it
            const processIssue = new Promise((resolve, reject) => {
                const pythonProcess = spawn('python3', ['../utils/packaged_python_prediction.py', issue.title, issue.body, stressLevel]);

                let scriptOutput = '';

                pythonProcess.stdout.on('data', (data) => {
                    scriptOutput += data.toString(); // Accumulate data from script
                });

                pythonProcess.stdout.on('end', () => {
                    // Handle script completion, such as parsing output if necessary
                    let outputData = scriptOutput.trim();
                    issue.difficulty = outputData; // or whatever the actual property name is if it's not 'content'
                    issue.stressLevel = stressLevel;
                    // Insert the issue into the system and resolve the promise once done
                    addIssueToSystem(issue)
                        .then(() => {
                            console.log('Issue was added to the system successfully.');
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Failed to add issue to the system:', error);
                            reject(error); // Reject the promise on error
                        });
                });

                pythonProcess.on('error', (error) => {
                    console.error('Failed to start the subprocess.', error);
                    reject(error); // Reject the promise on error
                });

                // Handle script errors
                pythonProcess.stderr.on('data', (data) => {
                    console.error(`Python script error output: ${data}`);
                });
            });
            await processIssue;
        }
        console.log(`Imported ${issuesFromRepo.length} issues.`);
    } catch (error) {
        console.error('Error importing issues:', error);
    }
}

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

app.get('/set_target_time', async (req, res) => {
    const url = `http://localhost:8080/averageTaskTime?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`;
    const response = await axios.get(url);
    timeMap = response.data;
    timeMap = timeMapping;
    console.log(timeMap);
    res.status(201).send('target time updated successfully');
});

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

// Define a route that receives the POST requests
app.post('/confirm_issue_data', async (req, res) => {
    const { title, description, stress, difficulty } = req.body; // extract other information as needed
    // Define your CSV file path
    const filePath = path.join(__dirname, 'utils/user_history.csv');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.sendStatus(500); // Internal Server Error
        }

        // Split the CSV file into lines
        let lines = data.split('\n');

        // Remove the first line (header)
        lines.shift();

        // Prepare the new line to be added
        const newIssue = `"${title}","${description}","${stress}","${difficulty}"`;

        // Add the new issue at the end of the array
        lines.push(newIssue);

        // Prepare data to be written to the CSV, turning the array back into a string
        const updatedData = lines.join('\n');

        fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.sendStatus(500); // Internal Server Error
            }
            console.log('CSV updated successfully.');
            res.status(200).send('Issue confirmed and CSV updated.');
        });
    });
});


app.post('/edit_issue', (req, res) => {
    const { issue_number, time, difficulty } = req.body;
    const issue = issues.find(i => i.issue_number === issue_number);
    if (issue) {
        // Ensure the timer is not running when editing
        if (issue.is_timer_on) {
            stopIssueTimer(issue);
        }
        issue.originalTime = time;
        issue.remainingTime = time; // Update the remaining time for this issue
        issue.difficulty = difficulty;
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

// POST route for GitHub webhooks
app.post('/webhook', async (req, res) => {
    // Respond that the webhook was received successfully
    res.status(202).send('Accepted');

    // Determine the type of event from GitHub
    const githubEvent = req.headers['x-github-event'];
    const body = req.body;
    const action = req.body.action;
    const data = req.body;

    // Handle different events and actions accordingly
    if (githubEvent === 'issues' && action === 'opened') {
        console.log(`An issue was opened with this title: ${data.issue.title}`);
        const response = await axios.get('http://localhost:8080/runMLPipeline');
        const stressLevel = response.data.stress;
        const processIssue = new Promise((resolve, reject) => {
                const pythonProcess = spawn('python3', ['../utils/packaged_python_prediction.py', data.issue.title, data.issue.body, stressLevel]);

                let scriptOutput = '';

                pythonProcess.stdout.on('data', (data) => {
                    scriptOutput += data.toString(); // Accumulate data from script
                });

                pythonProcess.stdout.on('end', () => {
                    let issue = {};
                    // Handle script completion, such as parsing output if necessary
                    let outputData = scriptOutput.trim();
                    issue.difficulty = outputData; // or whatever the actual property name is if it's not 'content'
                    issue.title = data.issue.title;
                    issue.number = data.issue.number;
                    issue.state = data.issue.number;
                    issue.stressLevel = stressLevel;
                    // Insert the issue into the system and resolve the promise once done
                    addIssueToSystem(issue)
                        .then(() => {
                            console.log('Issue was added to the system successfully.');
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Failed to add issue to the system:', error);
                            reject(error); // Reject the promise on error
                        });
                });

                pythonProcess.on('error', (error) => {
                    console.error('Failed to start the subprocess.', error);
                    reject(error); // Reject the promise on error
                });

                // Handle script errors
                pythonProcess.stderr.on('data', (data) => {
                    console.error(`Python script error output: ${data}`);
                });
            });      
            await processIssue;          
    }
});

//TODO: add in a POST route for changing the difficulty level of an issue

// Start the server and import issues
app.listen(port, () => {
    const token = process.env.GITHUB_TOKEN;
    console.log(token);
    console.log(`Server started on http://localhost:${port}`);
    importIssuesToSystem('cyl133', 'HackHarvard2023', token);
    resetCheckinTimer();
});