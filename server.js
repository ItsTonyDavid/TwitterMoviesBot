const movies = require("./movies.js");
const bot = require("./botEngine");

movies.getDailyMovie(function(error,response){
  if(error){
    //console.log('ptm error');
  }
  else{
    //console.log(response.name);
    bot.postTweet(('Sugested movie: ' + response.name), function(err, res){
      if(err){
        process.exit(1);
      }
      else{
        process.exit(0);
      }
    });
  }
})

//setInterval(postdaily, 1000*60*60*24);
