require('dotenv').config();
require('colors');

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const req = require('request');

client.get('statuses/user_timeline', {screen_name: 'benji_rows'}, function (error, tweets, response) {
  if (!error) {
    console.log(JSON.stringify(tweets, null, 2).rainbow);
  }
});
