var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8888;
var jokes=[{setup:"外圆正割垂直线，积分开方斜角边。（猜一节日）,",punchline:"中秋"},{setup:"离人千里得团聚（猜一字）",punchline:"I just can't seem to put it down"},{setup:"What do you call an Argentinian with a rubber toe?",punchline:"Roberto"}];

app.use(bodyParser.json());
app.listen(process.env.PORT || port, function(){
    console.log("Listening on " + port);
});

app.use(express.static('static'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.get('/jokes', function(req, res) {

    var randomNumber = Math.floor(Math.random() * jokes.length);
    jokes[randomNumber].id = randomNumber;

    res.send(jokes[randomNumber]);
});

app.post('/upvote', function(req, res) {
    console.log("Someone tried to upvote something");
    console.log(req.body);
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    console.log("Someone tried to downvote something.");
    console.log(req.body);
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});