# Liri-Bot

A simple command line interface for use of the twitter, spotify, and omdb api's

## Installation

In order to run this app you must first have node.js and npm installed.

To install the app clone this repository and use 'npm install' to gather the dependencies specified in the package.json file. You will also have to create a .env file containing the appropriate api keys.

Your .env file should look like this:

    # Spotify API keys
    
    SPOTIFY_ID=YOUR-SPOTIFY-ID
    SPOTIFY_SECRET=YOUR-SPOTIFY-SECRET
    
    # Twitter API keys
    
    TWITTER_CONSUMER_KEY=CONSUMER-KEY
    TWITTER_CONSUMER_SECRET=CONSUMER-SECRET
    TWITTER_ACCESS_TOKEN_KEY=YOUR-ACCESS-TOKEN
    TWITTER_ACCESS_TOKEN_SECRET=YOUR-ACCESS-SECRET
    
You must acquire your own versions of these access keys. The key for OMDB is included.

## instructions

This app is run from the command line like this:
    
    $ node liri.js arg1 arg2
   
The second argument is required only for spotify and omdb requests. The twitter api will be called using the account information you provide in the .env file.

#### Twitter

The twitter API can be called with no additional arguments like so:
    
    # this will return your last 20 tweets
    $ node liri.js my-tweets
    
#### Spotify

The Spotify will search for a single song and return related info:
    
    # this will return information about the song and artist
    $ node liri.js spotify-this-song 'song title'
    
#### OMDB

The OMDB API is accessed through the request package and returns information about a specified movie title.
    
    # this will return information about the
    $ node liri.js movie-this 'movie title'
    
#### read commands from file

The app is set up to interpret commands from a file in the same directory named random.txt. It is formatted like this:

    spotify-this-song,"ace of spades"

When you run this command

    $ node liri.js do-what-it-says
    
The app will run whatever command is specified in random.txt

## dependencies

- node.js
- npm
    - require
    - twitter
    - node-spotify-api
    - colors
    - dotEnv
    - fs
