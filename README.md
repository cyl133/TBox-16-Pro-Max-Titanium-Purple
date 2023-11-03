# Demo

https://github.com/cyl133/TBox-16-Pro-Max-Titanium-Purple/assets/50956270/d5dbb09a-d580-4cda-a41f-feddc1b4e7fb

 Inspiration
As software engineers, we constantly seek ways to optimize efficiency and productivity. While we thrive on tackling challenging problems, sometimes we need assistance or a nudge to remember that support is available. Our app assists engineers by monitoring their states and employs Machine Learning to predict their efficiency in resolving issues.

# What it does
Our app leverages LLMs to predict the complexity of GitHub issues based on their title, description, and the stress level of the assigned software engineer. To gauge the stress level, we utilize a machine learning model that examines the developer’s sleep patterns, sourced from TerraAPI. The app provides task completion time estimates and periodically checks in with the developer, suggesting when to seek help. All this is integrated into a visually appealing and responsive front-end that fits effortlessly into a developer's routine.

# How we built it
A range of technologies power our app. The front-end is crafted with Electron and ReactJS, offering compatibility across numerous operating systems. On the backend, we harness the potential of webhooks, Terra API, ChatGPT API, Scikit-learn, Flask, NodeJS, and ExpressJS. The core programming languages deployed include JavaScript, Python, HTML, and CSS.

# Challenges we ran into
Constructing the app was a blend of excitement and hurdles due to the multifaceted issues at hand. Setting up multiple webhooks was essential for real-time model updates, as they depend on current data such as fresh Github issues and health metrics from wearables. Additionally, we ventured into sourcing datasets and crafting machine learning models for predicting an engineer's stress levels and employed natural language processing for issue resolution time estimates.

# Accomplishments that we're proud of
In our journey, we scripted close to 15,000 lines of code and overcame numerous challenges. Our preliminary vision had the front end majorly scripted in JavaScript, HTML, and CSS — a considerable endeavor in contemporary development. The pinnacle of our pride is the realization of our app, all achieved within a 3-day hackathon.

# What we learned
Our team was unfamiliar to one another before the hackathon. Yet, our decision to trust each other paid off as everyone contributed valiantly. We honed our skills in task delegation among the four engineers and encountered and overcame issues previously uncharted for us, like running multiple webhooks and integrating a desktop application with an array of server-side technologies.

# What's next for TBox 16 Pro Max (titanium purple)
The future brims with potential for this project. Our aspirations include introducing real-time stress management using intricate time-series models. User customization options are also on the horizon to enrich our time predictions. And certainly, front-end personalizations, like dark mode and themes, are part of our roadmap.

# Built With
- css
- electron
- express.js
- flask
- github
- html5
- javascript
- llm
- node.js
- pandas
- python
- react
- scikit-learn
- terra-api
- typescript
