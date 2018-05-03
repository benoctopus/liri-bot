
require('dotenv').config();
require('colors');

const fs = require('fs');
const moment = require('moment');
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
          let output = (
            `----- ${tweets[0].user.name}'s Recent Tweets -----\n\n`
              .toUpperCase().cyan);
          tweets.forEach((item, index) => {
            output += (
              `--- ${index}. Published: ${item.created_at.split(' ')
                .splice(0, item.created_at.length - 2)
                .join().replace(/,/g, ' ')} ---\n`.green +
              `\n"${item.text}"\n\n`.blue
            );
          });
          console.log(output);
          log(output);
        }
        console.log(error)
      });
  },

  spotify_this_song: song => {

    spotify.search(
      {type: 'track', query: song, limit: 1},
      (error, data) => {
        if (!error) {
          let output = (
            `----- SPOTIFY Results For ${song} ------\n\n`.toUpperCase().cyan +
            `Title: ${data.tracks.items[0].name}\n`.blue +
            `Album: ${data.tracks.items[0].album.name}\n`.blue +
            `Artist: ${data.tracks.items[0].artists[0].name}\n`.blue +
            `Preview: ${data.tracks.items[0].preview_url}\n\n`.blue
          );
          console.log(output);
          log(output);
        }
        console.log(error);
        process.exit()
      }
    )

  },

  movie_this: movie => {

    req(
      `https://www.omdbapi.com/?apikey=${omdb}&t=${movie}`,
      (error, res) => {
        const data = JSON.parse(res.body);
        if (!error) {
          let output = (
            `----- OMDB Results For ${movie} ------\n\n`.toUpperCase().cyan +
            `Title: ${data.Title}\n`.blue +
            `Released: ${data.Released}\n`.blue +
            `Rotten Tomatoes: ${data.Ratings[1].Value}\n`.blue +
            `Produced In: ${data.Country}\n`.blue +
            `Language: ${data.Language}\n`.blue +
            `Plot: ${data.Plot}\n`.blue +
            `Actors: ${data.Actors}\n`.blue
          );
          console.log(output);
          log(output);
        }
        console.log(error);
        process.exit()
      }
    );
  },

  do_what_it_says: () => {

    fs.readFile('./random.txt', {encoding: 'utf8'}, (error, data) => {
      if (!error) {
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
    console.log('invalid command \n\n'
      + `Available commands:
      *my_tweets
        - gather last 20 tweets
      *spotify-this-song [song]
        - gather spotify data on song
      *movie-this [movie]
        - gather data on movie
      *do-what-it-says
        - read and execute command in random.txt`
    );
  }
}

function log(out) {
  console.log('saving to log...'.yellow);
  fs.stat('log.txt', (err, st) => {
    if (err === 'ENOENT') {
      fs.writeFileSync(
        'log.txt', 'log.txt', 'created: ' + new Date() + '\n\n' + out);
      console.log('log.txt successfully written!!'.green);
      process.exit()
    }
    else if (!!err && err.code !== 'ENOENT') {
      console.log(err.code);
      process.exit()
    }
  });
  fs.appendFileSync('log.txt', 'created: ' + new Date() + '\n\n' + out,
    {encoding: 'utf8'}, (err, data) => {
      console.log(err, data)
    });
  console.log('success!!'.green);
  process.exit()
}


//magic happens here
takeInput();
