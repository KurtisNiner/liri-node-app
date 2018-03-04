require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

console.log(process.argv[2]);

var command = process.argv[2];

if(command==="my-tweets"){
    console.log("thats it");
};