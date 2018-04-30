require('dotenv').config();
require('colors');

const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const req = require('request');


global.ops = {


  my_tweets: () => {

    client.get('statuses/user_timeline',
      {count: 20},
      (error, tweets) => {

        if (!error) {
          console.log(
            `----- ${tweets[0].user.name}'s Recent Tweets -----\n`
              .toUpperCase().cyan);

          tweets.forEach((item, index) => {
            console.log(
              `--- ${index}. Published: ${item.created_at} ---\n`.green +
              `\n"${item.text}"\n`.blue
            );
          });
          process.exit()
        }
        console.log(error)
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
