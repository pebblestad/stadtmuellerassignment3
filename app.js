var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
const nodeFetch = require('node-fetch');

const express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "html"));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function(req, res) {
    let url = 'https://xkcd.com/info.0.json';
    let img;
    nodeFetch(url)
    .then(resp => resp.json())
    .then(data => {
        img = data.img;
        res.render('index', {img:img});
    })
    .catch(err => {
        console.log(err);
        res.render('index');
    });
});

app.get('/randomComic', function(req, res) {
    var = random_number = Math.floor(Math.random() * 2219) + 1;
    getComic(random_number, res, "random_comic");
});

app.get('/another_random', function(req, res) {
    var random_number = Math.floor(Math.random() * 2219 + 1;
    getComic(random_number, res, "another_random");
});

/**
 * This function is used for getting comic by passing a random number between 1 to 2219
 * @param random_number : a random number from 1 to 2219
 * @param res : the response page
 * @param page : the page that you want to render
 */

 function getComic(random_number, res, page) {
     var request = require('request');
     request("https://xkcd.com/" + random_number + "/info.0.json", function(error, response, body) {
         if (!error && response.statusCode === 200) {
             var object = JSON.parse(body);

             res.render(page, {img_url: object.img, title: object.title, year: object.year });
         
         } else {
             res.render(page, {img_url: "", title: "Nothing here", year: "No year available"});
         }
     });
 }

http.createServer(app).listen(port, function()
{

});