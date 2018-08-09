const {parse} = require('csv');
const fs = require('fs');
const async = require("async");

var {Trial} = require('./../models/trial')



var parseData = (inputFile) => {
  var handPosX = [];
  var handPosY = [];
  var cursorPosX = [];
  var cursorPosY = [];
  var trialData = [];
  var cursorPos = [];
  var handPos = [];
  var cursorX;
  var cursorY;

  var parser = parse({delimiter: ','}, (err, data) => {
    if (err) {
      return console.log(err);
    }

    data.forEach((line) => {
      cursorX = parseInt(line[0]);
      cursorY = parseInt(line[1]);
      handX = parseInt(line[2])
      handY = parseInt(line[3])

      cursorPosX.push(cursorX);
      cursorPosY.push(cursorY);

      handPosX.push(handX);
      handPosY.push(handY);

      cursorPos.push([{cursorX}, {cursorY}]);
      handPos.push([{handX}, {handY}]);
    })
    console.log(cursorPos);
    console.log(handPos);
    console.log(cursorPosX);

    cursorPosX = cursorPosX.filter((obj) => !isNaN(obj))
    cursorPosY = cursorPosY.filter((obj) => !isNaN(obj))
    handPosX = handPosX.filter((obj) => !isNaN(obj))
    handPosY = handPosY.filter((obj) => !isNaN(obj))

    // var trialData = {cursorPosX, cursorPosY, handPosX, handPosY};


    var trial = new Trial({
      cursorPosX: cursorPosX,
      cursorPosY: cursorPosY,
      handPosX: handPosX,
      handPosY: handPosY
    });
    // console.log(JSON.stringify(trial));

    trial.save().then(t => {
      console.log("saved to database, ", t);
    }).catch((err) => console.log("unable to save, ",err));


  });
  fs.createReadStream(inputFile).pipe(parser);

};

parseData('./server/data/testData.csv');

// for(var i=1; i<=1; i++) {
//   console.log('Processing file:  ', i);
//   var inputFile = './server/data/testData' + i + '.csv';
//   parseData(inputFile);
// }






module.exports = {
  parseData
}
