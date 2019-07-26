//Require things
const request = require('request');
const promise = require('promise');
const fs = require('fs');

if ( process.env.NODE_ENV == 'production') {
    var tmdbCredentials = process.env.movieDB;
}
else {
    var credentials = require('./credentials')
    var tmdbCredentials = credentials.movieDB;
}

//Dates
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var suggestedLimitDate = year + "-" + (month-2) + "-" + day;

//Global functions that may work in many functions.

function random(min, max) { //Normal random funciton
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPage(numOfPages){ //Selects a random page in a range
  if(numOfPages > 1000){
    numOfPages = 1000;
  }
  var page = random(1, numOfPages)
  return page;
}

function getRandomMovie(numOfMovies){ //Selects a random movie position depending on the number of movies
  return random(0, numOfMovies-1)
}

const getMovieInfo = function(movie){//get name and description of a movie object
  return {
    name: movie.title,
    descrip: movie.overview,
    photoURL: "https://image.tmdb.org/t/p/w500" + movie.poster_path
  };
}

/* -------- IMPORTANT FUNCTIONS -------- */

//IMPORTANT FUNCTIONS
function getDailyMovie(callback){
  var page = getRandomPage(41);
  var movieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbCredentials;
  movieURL += '&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=' + page;
  movieURL += '&primary_release_date.gte=2008-01-01&vote_count.gte=100&vote_average.gte=7&without_genres=99';
  request({ url: movieURL, json: true}, function(error, response) {
    if (error) {
      callback('Service unavailable', undefined);
    }
    else {
      var movies = response.body.results;
      var randomMovie = getRandomMovie(movies.length);
      var movieObj = movies[randomMovie];
      callback(undefined, getMovieInfo(movieObj));
    }
  });
};

function getMoviePoster(moviePhotoURl, callback){
  request({url : moviePhotoURl, encoding : null}, function(error, response, body) {
      //Writing the buffer to a file
      fs.writeFile('./img/dailyMovie.png', body, { encoding : null}, function(err){
          if (err){
              callback(err, undefined);
            }
            else {
              callback(undefined, true);
            }
      });
  });
};

module.exports={
    getDailyMovie: getDailyMovie,
    getMoviePoster: getMoviePoster
};


//var weeklyNewMovieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbCredentials + '&with_release_type=2|3&region=US';
