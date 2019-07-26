const Twit = require('twit');
const fs = require('fs');

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
const postTweet = function(tweet, callback){
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    if(err){
      callback(err, undefined)
    }
    else{
      callback(undefined, true);
    }
  })
}


// Post a tweet with media
const postImage = function(altText, img, phrase, callback){
  //img must be encoded in base64
  var b64content = fs.readFileSync(img, { encoding: 'base64' })

  // first we must post the media to Twitter
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

    T.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: phrase, media_ids: [mediaIdStr] }

        T.post('statuses/update', params, function (err, data, response) {
          callback(undefined, true);
        })
      }
    })
  })
}

module.exports = {
  postTweet: postTweet,
  postImage: postImage
}
