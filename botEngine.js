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
