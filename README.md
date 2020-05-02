# react-gh-page
This is a test project for try the GitHub Pages with ReactJS project. For make it real it's matter of to follow the following steps:

## Create a new repository in GitHub
First  at all it's needed a repository where put the React code. As soon as the repository is created it's created a 'url' which to point.

## Install `gh-pages` module
This is the module which helps to deploy React apps for GitHub Page enviroment

`npm install gh-pages --save-dev`

## Update `package.json` file
Add in the json file the _homepage_ tag pointing to GitHub Page repository link:

"homepage": "https://ingporto.github.io/react-gh-page",

And add in scripts the command _predeploy_ and _deploy_ as following:

"scripts": {
    "predeploy": "npm run build",
    "deploy": "hg-pages -d build",
    ...

## Create the local git repo

`git init`

## Connect local repository to remote in github.com

`git remote add origin git@github.com:IngPorto/react-gh-page.git`

## Commit the changes
Report to git any change in the project

`git add .`

`git commit -m "..."`

## Deploy the project using `gh-pages`

`npm run deploy`

## Push the project to remote

`git push -u origin master`

> As it's was a builded folder, gh-pages encharge to push only those contents to our github repository into a new branch called `gh-pages`. All these in a few steps