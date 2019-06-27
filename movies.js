//Require things
//const credentials = require('./credentials.js');
const bot = require('./botEngine.js');
const request = require('request');
const promise = require('promise');
const fs = require('file-system');
//const tmdbCredentials = credentials.movieDB;

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

const getNameAndDescription = function(movie){//get name and description of a movie object
  return {
    name: movie.title,
    descrip: movie.overview
  };
}


//IMPORTANT FUNCTIONS
const getDailyMovie = function(callback){
  var page = getRandomPage(41);
  var movieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbCredentials;
  movieURL += '&language=en-US&region=US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=' + page;
  movieURL += '&primary_release_date.gte=2008-01-01&vote_count.gte=100&vote_average.gte=7&without_genres=99';
  request({ url: movieURL, json: true}, function(error, response) {
    console.log(page = '\n');
    if (error) {
      callback('Service unavailable', undefined);
    }
    else {
      var movies = response.body.results;
      var randomMovie = getRandomMovie(movies.length);
      var movieObj = movies[randomMovie];
      console.log(movieURL);
      console.log(movieObj);
      callback(undefined, getNameAndDescription(movieObj));
    }
  });
}

const getMovieImg = function(callback){
  url = "http://image.tmdb.org/t/p/w185/p2SdfGmQRaw8xhFbexlHL7srMM8.jpg";
  request({ url: url, json: true}, function(error, response){
    if(error){
      callback('service unavailable', undefined);
    }
    else{
      var rawImg = response.body;
      var imgBase64 = btoa(rawImg);// convert to Base64
      callback('undefined', imgBase64)
    }
  });
}



module.exports={
    getDailyMovie: getDailyMovie,
    getMovieImg: getMovieImg
};


var weeklyNewMovieURL = 'https://api.themoviedb.org/3/discover/movie?api_key=' + tmdbCredentials + '&with_release_type=2|3&region=US';
