import os
from langchain.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.schema import AIMessage, HumanMessage, SystemMessage
import openai
from dotenv import load_dotenv
import csv

load_dotenv()


openai.api_key = os.environ['OPENAI_API_KEY']

# Assuming the csv file is named 'data.csv'
with open('user_history.csv', 'r') as file:
    reader = csv.reader(file)

    # Read the first line and store it in 'columns'
    columns = next(reader)

    # Read the rest of the lines and store them in 'content'
    content = list(reader)

llm_model = "gpt-3.5-turbo"
chat = ChatOpenAI(temperature=0.0, model=llm_model)


prompt_template = """You are a data analyst. You have the following data columns:

{columns}

Here is the context data we have:

{content}

Here is my data in the following form:

{features}
{my_features}

Please predict the following label: {label}

Answer only the label and nothing else: """
PROMPT = PromptTemplate(
    template=prompt_template, input_variables=["columns", "content", "features", "my_features", "label"]
)

my_features = input().split(',')
predictor = PROMPT.format(columns=columns, content=content, features=columns[:-1], my_features=my_features, label=columns[-1])


system ="You are a helpful assistant that answers human question in the most concise and to the point way as possible. Please follow the human's instructions precisely"
messages = [
    SystemMessage(
        content=system
    ),
    HumanMessage(
        content=predictor
    ),
]

response = chat(messages)

breakpoint()