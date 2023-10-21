import requests
import json
import os
from dotenv import load_dotenv
import dateutil.parser as dp
import random
import pandas as pd

# Load environment variables from the .env file
load_dotenv()


# Your personal access token
access_token = os.getenv("GITHUB_API")

# Base URL for the GitHub API
base_url = 'https://api.github.com'

stress = ['very stressed', 'somewhat stress', 'relaxed', 'unbothered']
columns = ['Title', 'Description', 'Time', 'Stress']

# Retrieve issues from a repository
github_username = 'your-github-username'
repository_owner = 'langchain-ai'
repository_name = 'langchain'

#event: issue or pull
def get_data(event):
    endpoint = f'/repos/{repository_owner}/{repository_name}/{event}'
    headers = {'Authorization': f'Bearer {access_token}'}
    response = requests.get(base_url + endpoint, headers=headers)
    if response.status_code == 200:
        issues = response.json()
        for issue in issues:
            print(f"Issue #{issue['number']}: {issue['title']}")
    else:
        print(f"Failed to retrieve issues. Status code: {response.status_code}")
    return issues

def unix_timestamp(string):
    return int(dp.parse(string).timestamp())
    
def rand_stress():
    return stress[random.randint(0, 3)]
     
def processed_datum(datapoint):
    processed_datapoint = [datapoint['title'], datapoint['body']] 
    time_taken = unix_timestamp(datapoint['closed_at']) - unix_timestamp(datapoint['created_at'])
    processed_datapoint.append(time_taken)
    processed_datapoint.append(rand_stress())
    return processed_datapoint

def get_complexity(data):
    df = pd.DataFrame(data, columns=columns)
    df.sort_values(by='Time', ascending=False, inplace=True)
    top_20_percentile = int(0.2 * len(df))
    next_50_percentile = int(0.7 * len(df))
    df['Category'] = 'Easy'
    df.loc[df.index[:top_20_percentile], 'Category'] = 'Hard'
    df.loc[df.index[top_20_percentile:next_50_percentile], 'Category'] = 'Medium'
    return df
    
    
data = get_data('issues?state=closed')

processed_data = [processed_datum(datum) for datum in data]

sub = get_complexity(processed_data)

sub.to_csv('langchain_issue.csv', index=False)





