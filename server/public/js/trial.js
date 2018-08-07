var data =  JSON.parse(decodedJSON);
data = data[0];

width = 600;
height = 500;

margin = {top: 20, right: 20, bottom: 100, left: 100}



// Data formatting
// Transforming the coordinates to reference point (720, 450)
// Using normal orientation
data["cursorPosX"] = data["cursorPosX"].map((d, i) => d - 720);
data["cursorPosY"] = data["cursorPosY"].map((d, i) => 600 - d);
data["handPosX"] = data["handPosX"].map((d, i) => d - 720);
data["handPosY"] = data["handPosY"].map((d, i) => 600 - d);

var zipCursorPos = data["cursorPosX"].map((x, i) => ({cursorPosX: x, cursorPosY: data["cursorPosY"][i]}))

const yOffset = 100;
const targetOffset = 150

//  Design variables
const startCircleX = 0;
const startCircleY = 0;

const targetCircleX = 0;
const targetCircleY = startCircleY + targetOffset;

var t = d3.transition().duration(1000);
//  SCALES
var x = d3.scaleLinear().domain([-width/2, width/2]).range([0, width]);
var y= d3.scaleLinear().domain([-yOffset, 250]).range([height, 0]);
// Line path generator
var line = d3.line()
  .x(d => x(d.cursorPosX))
  .y(d => y(d.cursorPosY))




// Axes
var xAxisCall = d3.axisBottom(x);
var yAxisCall = d3.axisLeft(y).ticks(5);



// DESIGN
var g = d3.select("#graph-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Draw Axes
xAxis = g.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")");

yAxis = g.append("g")
  .attr("class", "y axis");



// Draw Path
var path = g.append("path")
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("stroke-width", "1px");


// Axes call
xAxis.call(xAxisCall);
yAxis.call(yAxisCall);


// Draw start circle
g.append('circle')
  .attr("cx", width/2)
  .attr("cy", y(0))
  .attr("r", 13)
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("fill", "none");

// Draw target circle
g.append('circle')
  .attr("cx", width/2)
  .attr("cy", y(targetOffset))
  .attr("r", 13)
  .attr("stroke", "black")
  .attr("stroke-width", 2)
  .attr("fill", "none");

// -
path
  .transition(t)
  .attr("d", line(zipCursorPos));

  console.log(zipCursorPos);
