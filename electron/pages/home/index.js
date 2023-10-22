// Sample array of objects
const issues = [
  {
    issueNumber: 1,
    issueName: "Add user authentication",
    duration: "2 days",
    difficulty: "Medium",
    progress: "Open",
    githubIssue: "https://github.com/your-repo/your-project/issues/1",
  },
  {
    issueNumber: 2,
    issueName: "Implement responsive design",
    duration: "1 day",
    difficulty: "Easy",
    progress: "Closed",
    githubIssue: "https://github.com/your-repo/your-project/issues/2",
  },
  {
    issueNumber: 3,
    issueName: "Fix bug in data retrieval",
    duration: "3 days",
    difficulty: "Hard",
    progress: "In Progress",
    githubIssue: "https://github.com/your-repo/your-project/issues/3",
  },
  {
    issueNumber: 4,
    issueName: "Refactor codebase",
    duration: "4 days",
    difficulty: "Medium",
    progress: "Open",
    githubIssue: "https://github.com/your-repo/your-project/issues/4",
  },
  {
    issueNumber: 5,
    issueName: "Optimize database queries",
    duration: "2 days",
    difficulty: "Medium",
    progress: "In Progress",
    githubIssue: "https://github.com/your-repo/your-project/issues/5",
  },
  {
    issueNumber: 6,
    issueName: "Add unit tests",
    duration: "1 day",
    difficulty: "Easy",
    progress: "Closed",
    githubIssue: "https://github.com/your-repo/your-project/issues/6",
  },
];

// Function to generate the list
function generateIssueList() {
  const issueList = document.getElementById("issue-list");


  function sendData(data) {
    // Encode the data for URL
    var encodedData = encodeURIComponent(data);

    // Redirect to the receiver page with the data in the URL
    window.location.href = "./pages/edit/index.html?data=" + encodedData;
  }

  issues.forEach(issue => {
      const difficultyClass = issue.difficulty === "Easy" ? "easy" : issue.difficulty === "Medium" ? "medium" : "hard";
      const issueStatusFile = issue.progress === "Open" ? "notStarted" : issue.progress === "In Progress" ? "inProgress" : "completed";

      const listItem = document.createElement("div");
      listItem.classList.add("issue-item"); // Add a CSS class for styling
      listItem.classList.add(difficultyClass);
      listItem.innerHTML = `
          <img src="./assets/icon/issueStatus/${issueStatusFile}.svg" alt="${issueStatusFile}"" class="progress-icon">
          <div class="issue-column" onclick="sendData(${issue})">
            <div class="issue-title">${issue.issueName} #${issue.issueNumber}</div>
            <div class="issue-time">${issue.duration}</div>
          </div>
          <div class="icon-button">
            <img src="./assets/icon/playPause/play.svg" alt="Play" class="icon">
          </div>
      `;
      issueList.appendChild(listItem);
  });
}

// Call the function to generate the list on page load
window.onload = generateIssueList;
