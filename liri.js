require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var doThis = process.argv[2];

// console.log(process.argv[2]);

switch (doThis) {
    case "my-tweets": tweets(); break;
    case "spotify-this-song": spotifySong(); break;
    case "movie-this": movieThis(); break;
    case "do-what-it-says": doWhatItSays(); break;
    default: console.log("command options: my-tweets, spotify-this-song, movie-this, do-what-it-says");
};

//twitter function that returns the latest tweets
function tweets() {
    var params = { screen_name: 'kurtisCoder' };
    twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        //  console.log(response);
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var myTweets =
                    "\r\n"
                    + "kurtis posted: "
                    + tweets[i].text
                    + "\n"
                console.log(myTweets);

            }
        }
    })
}

//spotify function that returns info on songs given to it

function spotifySong() {
    var songInput = process.argv[3];
    if (!songInput) {
        songInput = "livin on a prayer";
        (console.log("\r\n" + "because you didn't put in a song, I give you the best song ever!" + "\n"))
    }
    spotify.search({ type: "track", query: songInput, limit: 3 }, function (err, data) {
        if (!err) {
            var songInformation = data.tracks.items;
            // console.log(songInformation);
            for (var i = 0; i < 3; i++) {
                if (songInformation[i] != undefined) {
                    var songResult =
                        "The Song Informaiton you requested is: " + "\n"
                        + "\n"
                        + "*The artist is: " + songInformation[i].artists[0].name + "\n"
                        + "*The song name is: " + songInformation[i].name + "\n"
                        + "*A link to the song: " + songInformation[i].preview_url + "\n"
                        + "*The songs is on the " + "'" + songInformation[i].album.name + "'" + " album" + "\n"
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

//movie-this function, which takes a movie you want, and gives you info on it

function movieThis() {
    var movieInput = process.argv[3];
    if (!movieInput) {
        movieInput = "Mr Nobody";
        console.log(movieInput);
    }
    request("http://www.omdbapi.com?apikey=trilogy&t=" + movieInput + "&y=&plot=short&tomatoes=true&r=json", function (error, response, body) {
        if (!error) {
            var movieOutput = JSON.parse(body);
            // console.log(body);
        }
        var movieStuff =
            "Here is some information that you have requested about this movie"
            + "\r\n"
            + "\n"
            + "Title: " + movieOutput.Title + "\n"
            + "Released in " + movieOutput.Year + "\n"
            + "IMDB rating: " + movieOutput.imdbRating + "\n"
            + "Rotton Tomatoes Rating" + movieOutput.tomatoRating + "\n"
            + "This movie was produced in " + movieOutput.Country + "\n"
            + "This movies language is " + movieOutput.Language + "\n"
            + "Plot: " + movieOutput.Plot + "\n"
            + "Cast" + movieOutput.Actors + "\n"
            + "__________________________________________________"
        console.log(movieStuff);
    })

}

//doWhatItSays function takes "i want it that way" from random.txt and runs the spotifySong function
function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log("an error occurred" + error);
        }
        var doWhat = data.split(",");
        console.log(doWhat[0]);
            spotifySong(doWhat[0]);
            //i cant get this function to input the information from the random.txt file 
    });
}

