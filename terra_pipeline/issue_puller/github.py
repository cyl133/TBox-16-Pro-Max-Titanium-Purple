import requests
import os
from dotenv import load_dotenv
import dateutil.parser as dp
import pandas as pd

# Load environment variables from the .env file
load_dotenv()


# Your personal access token
access_token = os.getenv("GITHUB_API")

# Base URL for the GitHub API
base_url = 'https://api.github.com'

stress = ['very stressed', 'somewhat stress', 'relaxed', 'unbothered']
columns = ['Title', 'Description', 'Time']

# Retrieve issues from a repository
github_username = 'your-github-username'


#event: issue or pull
def get_data(repository_owner, repository_name, event):
    endpoint = f'/repos/{repository_owner}/{repository_name}/{event}'
    print(endpoint)
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(base_url + endpoint, headers=headers)
    if response.status_code == 200:
        issues = response.json()
        # for issue in issues:
        #     print(f"Issue #{issue['number']}: {issue['title']}")
    else:
        print(f"Failed to retrieve issues. Status code: {response.status_code}")
    return issues

def unix_timestamp(string):
    return int(dp.parse(string).timestamp())
     
def processed_datum(datapoint):
    processed_datapoint = [datapoint['title'], datapoint['body']] 
    time_taken = unix_timestamp(datapoint['closed_at']) - unix_timestamp(datapoint['created_at'])
    processed_datapoint.append(time_taken)
    return processed_datapoint

def get_rolling_avg(data):
    df = pd.DataFrame(data, columns=columns)
    df['Time'] = df['Time']/60
    df.sort_values(by='Time', ascending=False, inplace=True)
    top_third = int(0.33 * len(df))
    next_third = int(0.66 * len(df))
    df['Category'] = 'Easy'
    df.loc[df.index[:top_third], 'Category'] = 'Hard'
    df.loc[df.index[top_third:next_third], 'Category'] = 'Medium'
    
    easy_avg = df[df['Category'] == 'Easy']['Time'].mean()
    medium_avg = df[df['Category'] == 'Medium']['Time'].mean()
    hard_avg = df[df['Category'] == 'Hard']['Time'].mean()

    return [easy_avg, medium_avg, hard_avg]
    
def github_time_taken(repository_owner, repository_name):  
    data = get_data(repository_owner, repository_name, 'issues?state=closed')
    processed_data = [processed_datum(datum) for datum in data]
    avgs = get_rolling_avg(processed_data)
    return {"easy": avgs[0], "medium": avgs[1], "hard": avgs[2]}

if __name__ == '__main__':
    github_time_taken('langchain-ai', 'langchain')



