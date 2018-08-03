const d3 = require("d3");
var inputFile = './testData.csv';
console.log('Processing file');

d3.csv(inputFile, (d) => {
  console.log(d);
});
