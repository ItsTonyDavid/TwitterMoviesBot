const Twit = require('twit');

  if ( process.env.NODE_ENV == 'production') {
    var twitterCredentials = {
      consumer_key: process.env.twitter_consumer_key,
      consumer_secret: process.env.twitter_consumer_secret,
      access_token: process.env.twitter_access_token,
      access_token_secret: process.env.twitter_access_token_secret
    }
  }
  else {
      const credentials = require('./credentials')
      var twitterCredentials = {
        consumer_key: credentials.twitter_consumer_key,
        consumer_secret: credentials.twitter_consumer_secret,
        access_token: credentials.twitter_access_token,
        access_token_secret: credentials.twitter_access_token_secret
      }
  }

var T = new Twit(twitterCredentials);

//Post a tweet
const postTweet = function(tweet){
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    /*
    if(err){
      console.log(err);
    }
    else{
      console.log("Tweet published");
    }
    */
  })
}

module.exports = {
  postTweet: postTweet,
}
