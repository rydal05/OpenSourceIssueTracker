# FREEIRA

## An Entrypoint for the Lost Intermediate Developer
Intermediate level developers want to contribute to open source but don't know where or how to begin and have no one to hold their hand. It might seem daunting to figure out what to do, and most often, developers get lost in tutorial hell. Trying to claw their way out of the pits of the lost intermediate.

So we have created a web app that aggregates popular open source repos that allow anyone to make contributions to projects that are tailored to the end user.

## Features

- Automatic aggregation of popular/large open source repos that list things like issues and PRs
- Category searching for primary language, any big organizations, and maybe even what they're tackling (graphics for example)

### Account integration with github:
- new users can fill out a short form/questionnaire (or chat with a chatgpt wrapper) on account linkage/creation that allows them to use gemini or whatever AI LLM whatever to suggest some starter repos to follow
- users can save specific repos they want to keep up to date on
- users can submit their own repos to a database of they are looking for help or open source contribution (accounts have 24 hour submission limit or something idk)
- users can also import open source repos to their specific user (not submissions to the database) so they can track issues that aren't already found in the database 

### Project Scope 

1. GitHub GraphQL to fetch repos in batch & individualized comprehensive statistics (including but not limited to issues+PRs, repo tags, language usage, isses & PR gaps, etc)
2. Github oauth login (starring projects through the app stars them on their account in github)
3. LLM chatbot feature to find projects 
4. save/follow repos

### Demo Video & Other
Demo of the project is viewable [here](https://youtu.be/zB7AYFokeWQ?si=2xfSKD9YnrQF2cmp).
This was entered into the KnightHacks 2026 hackathon, [BloomKnights](https://bloomknights.devpost.com/).
The devpost is viewable [here](https://devpost.com/software/freeira).
