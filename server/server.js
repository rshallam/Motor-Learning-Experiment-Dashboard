const express = require('express');
const hbs = require('hbs');
const {ObjectId} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Trial} = require('./models/trial')
var {parseData} = require('./data/csv-read')

// var inputFile = 'server/data/testData.csv';

// parseData(inputFile);

//
// Trial.find({}).then((trial) => {
//   console.log(trial);
// }).catch((err) => console.log(err));

var app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname +'/views/');

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(__dirname +"/js"));

app.get('/d3', (req, res) => {
  res.render('d3test.hbs');
}, (err) => {
  console.log("unable to get, ", err);
});

app.listen(3000, () => console.log('server up and running on 3000'));
