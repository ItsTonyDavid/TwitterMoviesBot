//const credentials = require('./credentials.js');
const twitter_consumer_key = credentials.twitter_consumer_key;
const twitter_consumer_secret = credentials.twitter_consumer_secret;
const twitter_access_token = credentials.twitter_access_token;
const twitter_access_token_secret = credentials.twitter_access_token_secret;

const Twitter = {
  consumer_key: twitter_consumer_key,
  consumer_secret: twitter_consumer_secret,
  access_token: twitter_access_token,
  access_token_secret: twitter_access_token_secret
}

const Twit = require('twit');
var T = new Twit(Twitter);

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

//Post a imagen

// first we must post the media to Twitter
const postImagen = function(media){
  T.post('media/upload', { media_data: media }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Small flowers in a planter on a sunny balcony, blossoming."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

        T.post('statuses/update', params, function (err, data, response) {
          if(err){
            console.log("error");
          }
          else {
            console.log("succes!");
          }
        })
      }
    })
  })
}


module.exports = {
  postTweet: postTweet,
  postImagen: postImagen
}
