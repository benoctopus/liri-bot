//omdb key 52411065

require('dotenv').config();
require('colors');

const fs = require('fs');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const req = require('request');
const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);
const omdb = keys.OMDB.key;

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

    spotify.search(
      {type: 'track', query: song, limit: 1},
      (error, data) => {
        if (!error) {
          console.log(
            `----- SPOTIFY Results For ${song} ------\n\n`.toUpperCase().cyan +
            `Title: ${data.tracks.items[0].name}\n`.blue +
            `Album: ${data.tracks.items[0].album.name}\n`.blue +
            `Artist: ${data.tracks.items[0].artists[0].name}\n`.blue +
            `Preview: ${data.tracks.items[0].preview_url}\n\n`.blue
          );
          process.exit()
        }
        console.log(error)
      }
    )

  },

  movie_this: movie => {
    req(
      `https://www.omdbapi.com/?apikey=${omdb}&t=${movie}`,
      (error, res) => {
        const data = JSON.parse(res.body);
        if (!error) {
          console.log(
            `----- OMDB Results For ${movie} ------\n\n`.toUpperCase().cyan +
            `Title: ${data.Title}\n`.blue +
            `Released: ${data.Released}\n`.blue +
            `Rotten Tomatoes: ${data.Ratings[1].Value}\n`.blue +
            `Produced In: ${data.Country}\n`.blue +
            `Language: ${data.Language}\n`.blue +
            `Plot: ${data.Plot}\n`.blue +
            `Actors: ${data.Actors}\n`.blue
          );
          process.exit()
        }
        console.log(error);
      }
    );
  },

  do_what_it_says: () => {
    fs.readFile('./random.txt', {encoding: 'utf8'}, (error, data) => {
      if(!error) {
        const parsed = data.split(',');
        global.ops[parsed[0].replace(/-/g, '_')](parsed[1].replace(/"/g, ''))

      }
      else {
        console.log('random.txt could not be read')
      }
    });

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
