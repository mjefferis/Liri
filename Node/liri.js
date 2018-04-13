require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('./keys.js');
var request = require("request");
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var argument1 = process.argv[2];
var argument2 = process.argv[3];

if (argument1 == "my-tweets") {
    var screenName = {screen_name: 'mjefferis4'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(error){
          console.log(error);

        }
        else{
        for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
            console.log("mjefferis: " + tweets[i].text + " Tweet Created At: " + date.substring(0, 19));
        }
      }
    });
}

else if (argument1 == "spotify-this-song"&&argument2!=="undefined") {

    spotify.search({ type: 'track', query: argument2}, function(error, data){
        if(!error){
          for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song: " + songData.name);
            console.log("Preview URL: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
          }
        } 
        else{
          console.log('Error occurred.');
        }
      });
}

else if (argument1=="spotify-this-song" && argument2==null){
    var sign="the sign";
    spotify.search({ type: 'track', query: sign}, function(error, data){
        if(!error){
          for(var i = 0; i < data.tracks.items.length; i++){
            var songData = data.tracks.items[i];
            console.log("Artist: " + songData.artists[0].name);
            console.log("Song: " + songData.name);
            console.log("Preview URL: " + songData.preview_url);
            console.log("Album: " + songData.album.name);
          }
        } else{
          console.log('Error occurred.');
        }
      });
}

else if (argument1 == "movie-this"&& argument2 !=="undefined") {
   
    request("http://www.omdbapi.com/?t="+argument2+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
    
  if(!error && response.statusCode === 200) {
    
        movie = JSON.parse(body);
        console.log(movie.Title);
        console.log(movie.Year);
        console.log(movie.Language);
        console.log( movie.Country);
        console.log(movie.tomatoRating);
        console.log( movie.Plot);
        console.log(movie.Actors);
      }

      else{console.log(error);}
    });
    
}

else if (argument1 == "movie-this" && argument2==null) {
  var nobody="Mr. Nobody";
   
  request("http://www.omdbapi.com/?t="+nobody+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
  
if(!error && response.statusCode === 200) {
  
      movie = JSON.parse(body);
      console.log(movie.Title);
      console.log(movie.Year);
      console.log(movie.Language);
      console.log( movie.Country);
      console.log(movie.tomatoRating);
      console.log( movie.Plot);
      console.log(movie.Actors);
    }

    else{console.log(error);}
  });
  
}

else if (argument1 == "do-what-it-says") {
    fs.readFile('random.txt', "utf8", function(error, data){
        var txt = data.split(',');
    
        spotify.search({ type: 'track', query: txt[1] }, function (err, data) {
            if(!error){
                for(var i = 0; i < data.tracks.items.length; i++){
                  var songData = data.tracks.items[i];
                  console.log("Artist: " + songData.artists[0].name);
                  console.log("Song: " + songData.name);
                  console.log("Preview URL: " + songData.preview_url);
                  console.log("Album: " + songData.album.name);
                }
              } else{
                console.log('Error occurred.');
              }
            });
})}

else {
    console.log('Improper command. Try again.');
}