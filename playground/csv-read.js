const {parse} = require('csv');
const fs = require('fs');
const d3 = require("d3");

var inputFile = './testData.csv';
console.log('Processing file');

var handPosX = [];
var handPosY = [];
var cursorPosX = [];
var cursorPosY = [];


var parser = parse({delimiter: ','}, (err, data) => {
  if (err) {
    return console.log(err);
  }
  data.forEach((line) => {
    // trialData.push(line);
    cursorPosX.push(parseInt(line[0]));
    cursorPosY.push(parseInt(line[1]));
    handPosX.push(parseInt(line[2]));
    handPosY.push(parseInt(line[3]));

  })
  // console.log(trialData);
  cursorPosX = cursorPosX.filter((obj) => !isNaN(obj))
  cursorPosY = cursorPosY.filter((obj) => !isNaN(obj))
  handPosX = handPosX.filter((obj) => !isNaN(obj))
  handPosY = handPosY.filter((obj) => !isNaN(obj))


  // trialData = [cursorPosX, cursorPosY, handPosX, handPosY]
  var trialData0 = {cursorPosX, cursorPosY, handPosX, handPosY};
  console.log(trialData0);
});

fs.createReadStream(inputFile).pipe(parser);
