// set the data set constant reference
const dataUrl = "./assets/data/data.csv";

// set the svg up
let svgWidth = 690;
let svgHeight = 500;
let margin = {
    top: 20,
    bottom: 20,
    left: 40,
    right: 40
};
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// svg wrapper
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// append svg group
let chartGroup = svg.append("g")
    .attr("transform",`translate(${margin.left},${margin.top})`);

// select the data for the charts from the csv
d3.csv(dataUrl).then(healthdata => {
    // parse data and make them integers
    healthdata.forEach(data => {
        healthdata.id = +healthdata.id;
        healthdata.age = +healthdata.age;
        healthdata.ageMoe = +healthdata.ageMoe;
        healthdata.healthcare = +healthdata.healthcare;
        healthdata.healthcareHigh = +healthdata.healthcareHigh;
        healthdata.healthcareLow = +healthdata.healthcareLow;
        healthdata.income = +healthdata.income;
        healthdata.incomeMoe = +healthdata.incomeMoe;
        healthdata.obesity = +healthdata.obesity;
        healthdata.obesityHigh = +healthdata.obesityHigh;
        healthdata.obesityLow = +healthdata.obesityLow;
        healthdata.poverty = +healthdata.poverty;
        healthdata.povertyMoe = +healthdata.povertyMoe;
        healthdata.smokes = +healthdata.smokes;
        healthdata.smokesHigh = +healthdata.smokesHigh;
        healthdata.smokesLow = +healthdata.smokesLow;
    });
    console.log("data",healthdata);
});