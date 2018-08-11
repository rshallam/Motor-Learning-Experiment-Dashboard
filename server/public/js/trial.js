// var data =  JSON.parse(decodedJSON);
data = data[0];
console.log(data);
width = 600;
height = 500;

margin = {top: 20, right: 20, bottom: 100, left: 100}

// Data formatting
var cursorPos = data["cursorPos"];
// Transforming the coordinates to reference point (720, 450)
// Using normal orientation
cursorPos.map((d, i) => {
  d["cursorX"] = d["cursorX"] - 720;
  d["cursorY"] = 600 - d["cursorY"];
})

// data["handPosX"] = data["handPosX"].map((d, i) => d - 720);
// data["handPosY"] = data["handPosY"].map((d, i) => 600 - d);

// var cursorPos = data["cursorPosX"].map((x, i) => ({cursorPosX: x, cursorPosY: data["cursorPosY"][i]}))

const yOffset = 100;
const targetOffset = 150

//  Design variables
const startCircleX = 0;
const startCircleY = 0;

const targetCircleX = 0;
const targetCircleY = startCircleY + targetOffset;

var t = d3.transition().duration(400);
//  SCALES
var x = d3.scaleLinear().domain([-width/2, width/2]).range([0, width]);
var y= d3.scaleLinear().domain([-yOffset, 250]).range([height, 0]);
// Line path generator
var line = d3.line()
  .x(d => x(d.cursorX))
  .y(d => y(d.cursorY))


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

//  X label
g.append("text")
	.attr("x", width/2)
	.attr("y", height + 80)
	.attr("text-anchor", "middle")
	.attr("font-size", 20)
	.text("X")

// Y label
g.append("text")
	.attr("x", -height/2)
	.attr("y", - 80)
	.attr("transform", "rotate(-90)")
	.attr("text-anchor", "middle")
	.attr("font-size", 20)
	.text("Y")

// Draw Path
var path = g.append("path")
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "gray")
  .attr("stroke-width", "1px");


// Axes call
xAxis.transition(t).call(xAxisCall);
yAxis.transition(t).call(yAxisCall);


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
  .attr("d", line(cursorPos));
