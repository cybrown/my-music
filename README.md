# my-music

## Install project for dev
* Clone this repo
* cd into the project's directory
* Install all dependencies `npm run install-all`
* Run `npm run front-watch` to run compile watchers and web server (port 8080)

## Create database
* Copy music files to front/public/musics
* Run `npm run update-library` (mp3 and m4a only files are scanned)
* Verify the front/public/data.json file

## Build project for dev without watchers
* Run `npm run front-build-dev`

## Build project for production
* Run `npm run front-build-prod`

## Install project on server
* Copy all the front/public directory to a static file server (apache, nginx, even dropbox...)

## Trello board
[Link to Trello](https://trello.com/b/E9cS5nQN/music)
