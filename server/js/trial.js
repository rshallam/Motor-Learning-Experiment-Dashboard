width = 600;
margin = 500;

margin = {top: 20, right: 20, bottom: 100, left: 100}

console.log('whazzup');

g = d3.select("#graph-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
