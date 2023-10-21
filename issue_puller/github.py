import requests
import json



# Replace these with your GitHub username, repository owner, and repository name
github_username = 'your-github-username'
repository_owner = 'repository-owner'
repository_name = 'repository-name'

# Your personal access token
access_token = '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'

# Base URL for the GitHub API
base_url = 'https://api.github.com'

# Retrieve issues from a repository
def get_issues():
    endpoint = f'/repos/bitcoin/bitcoin/issues'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(base_url + endpoint, headers=headers)
    if response.status_code == 200:
        issues = response.json()
        for issue in issues:
            print(f"Issue #{issue['number']}: {issue['title']}")
    else:
        print(f"Failed to retrieve issues. Status code: {response.status_code}")
    return issues

# Retrieve pull requests from a repository
def get_pull_requests():
    endpoint = f'/repos/{repository_owner}/{repository_name}/pulls'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(base_url + endpoint, headers=headers)
    if response.status_code == 200:
        pull_requests = response.json()
        for pr in pull_requests:
            print(f"Pull Request #{pr['number']}: {pr['title']}")
    else:
        print(f"Failed to retrieve pull requests. Status code: {response.status_code}")

# Example usage
data = get_issues()
file_name = "bitcoin_issues.json"
with open(file_name, "w") as json_file:
    json.dump(data, json_file)