// set the data set constant reference
const dataUrl = "assets/data/data.csv";

// set the svg up
let svgWidth = 690;
let svgHeight = 500;
let margin = {
    top: 20,
    bottom: 60,
    left: 60,
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
        data.id = +data.id;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.healthcare = +data.healthcare;
        data.healthcareHigh = +data.healthcareHigh;
        data.healthcareLow = +data.healthcareLow;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.obesity = +data.obesity;
        data.obesityHigh = +data.obesityHigh;
        data.obesityLow = +data.obesityLow;
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.smokes = +data.smokes;
        data.smokesHigh = +data.smokesHigh;
        data.smokesLow = +data.smokesLow;
    });
    console.log("healthdata",healthdata);

    // scale the function
    let xLinearScale = d3.scaleLinear()
        .domain([
            d3.min(healthdata, data => data.obesity) * 0.8,
            d3.max(healthdata, data => data.obesity) * 1.2
        ])
        .range([0,width]);
    let yLinearScale = d3.scaleLinear()
        .domain([
            d3.min(healthdata, data => data.age) * 0.8,
            d3.max(healthdata, data => data.age) * 1.2
        ])
        .range([height,0]);

    // create the axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append axis to the chart
    // x axis
    chartGroup.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis);
    // y axis
    chartGroup.append("g")
        .call(leftAxis);

    // create circles
    let circlesGroup = chartGroup.selectAll("circle")
        .data(healthdata)
        .enter()
        .append("g")
    let circling = circlesGroup.append("circle")
        .attr("cx", data => xLinearScale(data.obesity))
        .attr("cy", data => yLinearScale(data.age))
        .attr("r", 10)
        .attr("fill","lightblue")
        .attr("opacity","0.75");
    let texting = circlesGroup.append("text")
        .text(data => data.abbr)
        .attr("x", data => xLinearScale(data.obesity))
        .attr("y", data => yLinearScale(data.age)+4)
        .attr("fill","white")
        .attr("font-size", "11px")
        .attr("text-anchor", "middle")

    // create tool tips for circles
    let toolTip = d3.tip()
        .attr("class","d3-tip") //from d3Style.css
        .offset([80,-50])
        .html(data => `${data.state}<br>Obesity: ${data.obesity}%<br>Age: ${data.age}`);
    circlesGroup.call(toolTip);
    // mouseover on and out
    // DO NOT use pointers... apparently it REALLY doesn't like them in this part
    circlesGroup.on("mouseover", function(data) {
            return toolTip.show(data,this);
        })
    circlesGroup.on("mouseout", function(data, index) {
            return toolTip.hide(data,this);
        })

    // axes labels
    // yaxis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Age")
    // xaxis
    chartGroup.append("text")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
        .attr("class", "axisText")
        .text("Obesity %");
});
