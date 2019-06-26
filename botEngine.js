const credentials = require('./credentials.js');
const Twit = require('twit');

var T = new Twit(credentials.twitter);

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


/*
//Verify credentials
const getCredentials = T.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    // `result` is an Object with keys "data" and "resp".
    // `data` and `resp` are the same objects as the ones passed
    // to the callback.
    // See https://github.com/ttezel/twit#tgetpath-params-callback
    // for details.
    console.log('data', result.data);
  })
*/


module.exports = {
  postTweet: postTweet
}
