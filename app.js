var http = require('http');
var path = require('path');
var fetch = require('node-fetch');
const express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "html"));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var imageLink = '';
var year = '';
var title = '';
const MAX_NUMBER_COMIC = 2237;

app.get('/', function (req, res) {
    getComicInformation(-1);
    res.render("index", { img_url: imageLink, title: title, year: year });
});

app.get('/rand_comic', function (req, res) {
    var random_number = Math.floor(Math.random() * MAX_NUMBER_COMIC) + 1;
    getComicInformation(random_number);
    res.render("rand_comic", { img_url: imageLink, title: title, year: year });
});

app.get('/rand_comic_two', function (req, res) {
    var random_number = Math.floor(Math.random() * MAX_NUMBER_COMIC + 1);
    getComicInformation(random_number);
    res.render("rand_comic_two", { img_url: imageLink, title: title, year: year });
});

/**
 * This function is used for getting comic by passing a random number between 1 to 2219
 * @param random_number : a random number from 1 to 2219
 * @param res : the response page
 * @param page : the page that you want to render
 */

function getComicInformation(randomNumber) {
    var url;

    if (randomNumber === -1) {
        url = 'http://xkcd.com/info.0.json';
    } else {
        url = 'http://xkcd.com/' + randomNumber + '/info.0.json';
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            imageLink = data.img;
            title = data.title;
            year = data.year;
        }).catch(err => {
            console.log(err);
        });
}

http.createServer(app).listen(port, function () {

});