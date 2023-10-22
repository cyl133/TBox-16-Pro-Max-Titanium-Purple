import json 
import pandas as pd
import dateutil.parser as dp
from github import unix_timestamp
import joblib
# Now you can use 'loaded_model' to make predictions as you would with the original model

avgs = [16, 96, 6.9, 50]
cols = [
    "respiration rate",
    "blood oxygen",
    "sleeping hours",
    "heart rate",
]
stress = ['very high stress', 'hig stress', 'medium stress', 'low stress', 'no stress']


def process_sleep_duration(duration):
    try:
        sleep_duration = duration['asleep']['duration_asleep_state_seconds']/(60*60)
    except:
        sleep_duration = 0
    return sleep_duration

def process_respiration(respiration):
    try:
        avg_breadth = respiration['breaths_data']['avg_breaths_per_min']
    except:
        avg_breadth = 0
    
    avg_oxygen_saturation, counter = [0, 0]
    
    try:
        for counter, datum in enumerate(respiration['oxygen_saturation_data']['samples']):
            avg_oxygen_saturation += datum['percentage']
        avg_oxygen_saturation /= (counter+1)
    except:
        avg_oxygen_saturation = 0
            
    return avg_breadth, avg_oxygen_saturation

def process_heart(heart):
    try:
        avg_bpm = heart['heart_rate_data']['summary']['avg_hr_bpm']
    except:
        avg_bpm = 0
        
    return avg_bpm
    
# def process_res
def get_features(data):
    sleep_info = data['data'][-1]
    total_sleep = process_sleep_duration(sleep_info['sleep_durations_data'])
    [avg_respiration, avg_oxygen_saturation] = process_respiration(sleep_info['respiration_data'])
    avg_bpm = process_heart(sleep_info['heart_rate_data'])
    final_data = [avg_respiration, avg_oxygen_saturation, total_sleep, avg_bpm]
    for i in range(len(final_data)):
        if final_data[i] == 0:
            final_data[i] = avgs[i]
    df = pd.DataFrame([final_data], columns = cols)
    return df

def run_ml_pipeline(data):
    loaded_model = joblib.load('xgboost_model.pkl')
    features = get_features(data)
    return {"stress": stress[4 - loaded_model.predict(features.values)[0]]}

if __name__ == '__main__':
    filename = "/Users/guevara/Documents/hackharvard 2023/HackHarvard2023/ml/last_data (1).json"
    with open(filename, 'r') as file:
        data = json.load(file)
    print(run_ml_pipeline(data))
    