// settings below

var CSV_FILE = "/static/data.csv";
var IMAGES_FOLDER = "/static/data/";

var xCat = "x",
    yCat = "y",
    nameCat = "image_name";

// rest of logic below

var margin = { top: 0, right: 0, bottom: 0, left: 0 },
    outerWidth = 1400,
    outerHeight = 600,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

d3.csv(CSV_FILE, function(data) {
  var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
      xMin = d3.min(data, function(d) { return d[xCat]; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
      yMin = d3.min(data, function(d) { return d[yCat]; }),
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        html_tip = "<img src=\"" + IMAGES_FOLDER + d[nameCat] + "\" alt=\"" + d[nameCat] + "\" />";
        html_tip += "<p>" + d[nameCat] + "</p>";
        return html_tip
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    //.append("text")
    //  .classed("label", true)
    //  .attr("x", width)
    //  .attr("y", margin.bottom - 10)
    //  .style("text-anchor", "end")
    //  .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis);
    //.append("text")
    //  .classed("label", true)
    //  .attr("transform", "rotate(-90)")
    //  .attr("y", -margin.left)
    //  .attr("dy", ".71em")
    //  .style("text-anchor", "end")
    //  .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("svg:image")
      .classed("dot", true)
      .attr("width", 50)
      .attr("height", 50)
      .attr("xlink:href", function(d) { return IMAGES_FOLDER + d[nameCat]; })
      .attr("transform", transform)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0);

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", width)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", height);

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", width)
      .attr("y2", height);

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
});
