const movies = require("./movies.js");
const bot = require("./botEngine.js");

movies.getDailyMovie(function(error,response){
  if(error){
    process.exit(1);
  }
  else{
    movies.getMoviePoster(response.photoURL, function(err, res){
      if(err){
        process.exit(1);
      }
      else {
        bot.postImage(response.name, 'img/dailyMovie.png', response.name, function(errbot, resbot){
          if(errbot){
            process.exit(1);
          }
          else{
            process.exit(0);
          }
        });
      }
    })
  }
});
