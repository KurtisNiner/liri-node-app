require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var doThis = process.argv[2];

// console.log(process.argv[2]);

// var command = process.argv[2];

// if(command==="my-tweets"){
//     console.log("thats it");

// };
switch (doThis) {
    case "my-tweets": tweets(); break;
    case "spotify-this-song": spotifySong(); break;
    case "movie-this": movieThis; break;
    case "do-what-it-says": doWhatItSays; break;

    default: console.log("ok");
};


//twitter function that returns the latest tweets
function tweets() {
    var params = { screen_name: 'kurtisCoder' };
    twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        //  console.log(response);
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var myTweets = "kurtis posted: "
                    + tweets[i].text
                    + "\n"
                console.log(myTweets);
                log(myTweets);
            }
        }
    })
}

//spotify function that returns info on songs given to it

function spotifySong(songInput) {
    var songInput = process.argv[3];
    if (!songInput) {
        songInput = "livin on a prayer";
    }
    spotify.search({ type: "track", query: songInput }, function (err, data) {
        if (!err) {
            var songInformation = data.tracks.items;
            // console.log(songInformation);
            for (var i = 0; i < 3; i++) {
                if (songInformation[i] != undefined) {
                    var songResult =
                    "The Song Informaiton you requested is: " + "\n"
                        +"\n"
                        + "The artist is: " + songInformation.artists + "\n"
                        + "The song name is: " + songInformation.name + "\n"
                        + "a link to the song: " + songInformation.preview_url + "\n"
                        + "The songs is on the " + songInformation.album + " album" + "\n"
                        + "_______________________________________"
                        + "\n"
                    console.log(songResult);
                }
            }
        }
        else {
            console.log("dude, i'm sorry, but an error has occurred " + err); 
        }
    });
};