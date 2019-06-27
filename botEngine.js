const Twit = require('twit');
const twitterCredentials = getCredentials();

function getCredentials(){
  if ( process.env.NODE_ENV == 'production') {
    const twitterCredentials2 = {
      consumer_key: process.env.twitter_consumer_key,
      consumer_secret: process.env.twitter_consumer_secret,
      access_token: process.env.twitter_access_token,
      access_token_secret: process.env.twitter_access_token_secret
    }
    return twitterCredentials2;
  }
  else {
      const credentials = require('./credentials')
      const twitterCredentials2 = {
        consumer_key: credentials.twitter_consumer_key,
        consumer_secret: credentials.twitter_consumer_secret,
        access_token: credentials.twitter_access_token,
        access_token_secret: credentials.twitter_access_token_secret
      }
      return twitterCredentials2;
  }
}

var T = new Twit(twitterCredentials);

//Post a tweet
const postTweet = function(tweet){
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    if(err){
      console.log(err);
    }
    else{
      console.log("Tweet published");
    }
  })
}

module.exports = {
  postTweet: postTweet,
}
