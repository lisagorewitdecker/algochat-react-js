# Algochat React JS  – Algorithm and Chat Playground
## License
<img src="https://camo.githubusercontent.com/901e2f86275f793e9788a0960b8b5ac24ac4d3a1/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f616d6572636965722f62616467652d67656e657261746f722e737667" alt="License" data-canonical-src="https://img.shields.io/github/license/amercier/badge-generator.svg" style="max-width:100%;">

## Description
Algorithm playground application with group chatting, video, audio and general individual chat messaging capabilities. This Algochat application was primarily programmed with the React JS framework, Pusher and CometChat and was developed by Lisa Gorewit-Decker.

## Prerequisites
Setup your development environment for Algochat.

If you don't have Node installed, download version 10.16.2 from homebrew or by using the Node official website at Nodejs.org

Once Node and NPM are installed. You should verify your installs and versions by running the following commands below:

<b>node -v</b><br>
<b>npm -v</b><br>

### Getting Started
Now add application dependencies by following the steps below:

<b>npm install</b><br>
Open your project package.json file and ensure that your node_module dependencies are installed and that your package-lock.json file was generated</b><br>

Testing Algochat
You can test Algochat with a local server by initiating the command below:

<b>npm run dev</b><br>
Navigate to localhost:5000 to check sample app. You can update the localhost number in package.json file.

Building Algochat
When your modifications to algochat have been made, webpack is used to bundle and generate the applicatiopn build.
In order to build your final version of the algochat run the commmand below:
<b>npm run build</b><br>
The final bundled file is called is "cc-ui-min.js" and is generated and saved into the test folder.

Finally, please check the webpack.config.js file for settings to update if needed and ensure that your .babelrc file is displaying


## Installing
The source code can be found at <a href="https://github.com/lisagorewitdecker/algochat-react-js.git">https://github.com/lisagorewitdecker/algochat-react-js.git</a>.

## How to Clone/Initialize Repository
<b>git clone</b>

Create a Feature Branch and Push To It. You Can Do a Remote Commit With the Following:<br>
<b>git checkout master</b><br>
<b>git pull</b><br>
<b>git checkout -b your_feature_branch_goes_here</b><br>
Make your edits

This Command Will Show You New Files and Confirm What Branch You're On:<br>
<b>git status</b><br>

To See Files Which Have Been Modified or Changed Use the Command Below:<br>
<b>git diff</b><br>

In Order to Add Files and Stage These Files for Commit:<br>
<b>git add "XYZ"</b> for any new files, e.g. "XYZ".<br>
You may also use the command:<br>
<b>git add . </b>

To Commit: <br>
<b>git commit --all</b><br>
<b>git push origin your_feature_branch_goes_here</b><br>

Then navigate to the pull requests page at github.com within the repository and choose <b>New pull request</b> in order to create a request to merge your feature branch into master.<br>

When you are ready to Merge your feature branch into master, click the <b>Merge</b> button and let the github website perform the actual change to master. You can then close the source branch on github and delete your local branch with:<br>
<b>git checkout master && git pull && git branch -d your_feature_branch_goes_here</b>

Try to make your feature branch as short and descriptive as you can be. If you have to refactor due to your change(s), create one feature branch for refactoring, another that will build on it.

## Live Site Link
[![Netlify Status](https://api.netlify.com/api/v1/badges/e71c28eb-e29a-4b4f-8bd9-a447a5ba47a8/deploy-status)](https://5febd382b41d9d3695f8b36e--unruffled-goldberg-75b3b5.netlify.app/deploys)

## Built With
React JS Framework, JavaScript, CometChat, Pusher, HTML5, CSS3 and Adobe Creative Suite

## Versioning 
1.0

## Authors
Lisa Gorewit-Decker
