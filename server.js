const movies = require("./movies.js");
const bot = require("./botEngine")


movies.getDailyMovie(function(error,response){
    if(response){
      bot.postTweet("Pelicula sugerida de hoy: " + response.name)
      console.log(response.name);
    }
    else{
      console.log(error);
    }
});

/*
movies.getMovieImg(function(error, response){
  if(response){
    bot.postImagen(response);
    console.log("worked?");
  }
  else{
    console.log(error);
  }
});
*/
