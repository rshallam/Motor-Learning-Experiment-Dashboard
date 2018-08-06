const express = require('express');
const hbs = require('hbs');
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Trial} = require('./models/trial')
var {parseData} = require('./data/csv-read')

// var inputFile = 'server/data/testData.csv';

// parseData(inputFile);

//


var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname +'/views/');

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(__dirname +"/public"));

app.get('/d3', (req, res) => {

  Trial.find({}).then((trial) => {
    trial = encodeURIComponent(JSON.stringify(trial));
    res.render('d3test.hbs', {trial})
  }).catch((err) => console.log(err));

}, (err) => {
  console.log("unable to get, ", err);
});

app.listen(3000, () => console.log('server up and running on 3000'));
