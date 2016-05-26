var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/docs'));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//handle all gets
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/docs/index.html');
});

app.listen(process.env.PORT || 3001);

function handleError(res, err) {
    return res.status(500).send(err);
}