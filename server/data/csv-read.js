const {parse} = require('csv');
const fs = require('fs');
const async = require("async");

var {Trial} = require('./../models/trial')

var {mongoose} = require('./../db/mongoose');



var parseData = (inputFile) => {
  var handPosX = [];
  var handPosY = [];
  var cursorPosX = [];
  var cursorPosY = [];
  var trialData = [];
  var cursorPos = [];
  var handPos = [];
  var dVelocity = [];
  var cursorX;
  var cursorY;

  var parser = parse({delimiter: ','}, (err, data) => {
    if (err) {
      return console.log(err);
    }

    data.forEach((line, i) => {
      if(i !== 0) {
        trial = parseInt(line[0])

        cursorX = parseInt(line[2]);
        cursorY = parseInt(line[3]);
        handX = parseInt(line[4])
        handY = parseInt(line[5])
        dVel = parseFloat(line[6]);

        cursorPosX.push(cursorX);
        cursorPosY.push(cursorY);

        handPosX.push(handX);
        handPosY.push(handY);

        dVelocity.push(dVel);

        cursorPos.push({cursorX, cursorY});
        handPos.push({handX, handY});
      }
    })
    console.log(dVelocity, Math.max(...dVelocity));

    // cursorPosX = cursorPosX.filter((obj) => !isNaN(obj))
    // cursorPosY = cursorPosY.filter((obj) => !isNaN(obj))
    // handPosX = handPosX.filter((obj) => !isNaN(obj))
    // handPosY = handPosY.filter((obj) => !isNaN(obj))

    // var trialData = {cursorPosX, cursorPosY, handPosX, handPosY};


    var trial = new Trial({
      cursorPos: cursorPos,
      handPos: handPos,
      cursorPosX: cursorPosX,
      cursorPosY: cursorPosY,
      handPosX: handPosX,
      handPosY: handPosY,
      dVelocity: dVelocity,
      trial: trial
    });

    trial.save().then(t => {
      console.log("saved to database,",t["trial"]);
    }).catch((err) => console.log("unable to save, ",err));


  });
  fs.createReadStream(inputFile).pipe(parser);

};

// parseData('./server/data/testData.csv');

for(var i=1; i<=5; i++) {
  console.log('Processing file:  ', i);
  var inputFile = './server/data/testData' + i + '.csv';
  parseData(inputFile);
}






module.exports = {
  parseData
}
