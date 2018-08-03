const {parse} = require('csv');
const fs = require('fs');

var {Trial} = require('./../models/trial')


console.log('Processing file');


// var inputFile = './server/data/testData.csv';


var parseData = (inputFile) => {
  var handPosX = [];
  var handPosY = [];
  var cursorPosX = [];
  var cursorPosY = [];
  var trialData = [];

  var parser = parse({delimiter: ','}, (err, data) => {
    if (err) {
      return console.log(err);
    }
    data.forEach((line) => {
      cursorPosX.push(parseInt(line[0]));
      cursorPosY.push(parseInt(line[1]));
      handPosX.push(parseInt(line[2]));
      handPosY.push(parseInt(line[3]));
    })

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

    trial.save().then(t => {
      console.log("saved to database, ", t);
    }).catch((err) => console.log("unable to save, ",err));

  });



  fs.createReadStream(inputFile).pipe(parser);

};


// parseData(inputFile);

module.exports = {
  parseData
}
