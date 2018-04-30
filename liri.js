require('dotenv').config();

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const req = require('request');


global.ops = {


  my_tweets: () => {
    console.log('twitter');

    client.get('statuses/user_timeline', {screen_name: 'nodejs'},
      function (error, tweets, response) {
        if (!error) {
          console.log(JSON.stringify(tweets, null, 2));
        }
      });
  },

  spotify_this_song: song => {
    console.log('spotify')

  },

  movie_this: movie => {
    console.log('omdb')

  },

  do_what_it_says: thing => {
    console.log('do it')

  }
};

function takeInput() {
  const service = process.argv[2].replace(/-/g, '_').toLowerCase();
  const command = process.argv
    .splice(3, process.argv.length - 2).join().replace(/,/g, ' ');
  try {
  global.ops[service](
    typeof command !== 'undefined' ? command : null)
  }
  catch (e) {
    console.log('invalid command \n' + e)
  }
}


takeInput();
