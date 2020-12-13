// set the data set constant reference
const dataUrl = "./assets/data/data.csv";

// set the svg up
let svgWidth = 690;
let svgHeight = 500;
let margin = {
    top: 20,
    bottom: 100,
    left: 100,
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

// set initial axis parameters
let chosenXaxis = "obesity";
let chosenYaxis = "age";

// render the scales with 20% buffers
function renderXScale(healthdata, chosenXaxis) {
    let xLinearScale = d3.scaleLinear()
        .domain([
            d3.min(healthdata, data => data[chosenXaxis]) * 0.8,
            d3.max(healthdata, data => data[chosenXaxis]) * 1.2
        ])
        .range([0,width]);
    return xLinearScale;
};
function renderYScale(healthdata, chosenYaxis) {
    let yLinearScale = d3.scaleLinear()
        .domain([
            d3.min(healthdata, data => data[chosenYaxis]) * 0.8,
            d3.max(healthdata, data => data[chosenYaxis]) * 1.2
        ])
        .range([height,0]);

    return yLinearScale;
};

//

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
    let xLinearScale = renderXScale(healthdata, chosenXaxis);
    let yLinearScale = renderYScale(healthdata, chosenYaxis);

    // initialize the axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append axis to the chart
    let xAxis = chartGroup.append("g")
        .classed("xaxis", true)
        .attr("transform", `translate(0,${height})`)
        .call(bottomAxis);
    let yAxis = chartGroup.append("g")
        .classed("yaxis", true)
        .call(leftAxis);

    // create circles
    let circlesGroup = chartGroup.selectAll("circle")
        .data(healthdata)
        .enter()
        .append("g");
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
        .attr("text-anchor", "middle");

    // create axes label groups
    let xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`);
    let yLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${0 - margin.left/2}, ${height/2})`);
    // create the possible xaxis labels
    let obesityLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",0)
        .attr("value","obesity")
        .classed("active",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Obesity (%)")
    let healthcareLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",20)
        .attr("value","healthcare")
        .classed("inactive",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Healthcare (%)")
    let smokesLabel = xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",40)
        .attr("value","smokes")
        .classed("inactive",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Smokes (%)")
    // create the possible yaxis labels
    let ageLabel = yLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",0)
        .attr("transform","rotate(-90)")
        .attr("dy","1em")
        .attr("value","age")
        .classed("active",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Age")
    let incomeLabel = yLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",0-20)
        .attr("transform","rotate(-90)")
        .attr("dy","1em")
        .attr("value","age")
        .classed("inactive",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Income")
    let povertyLabel = yLabelsGroup.append("text")
        .attr("x",0)
        .attr("y",0-40)
        .attr("transform","rotate(-90)")
        .attr("dy","1em")
        .attr("value","age")
        .classed("inactive",true) //from d3Style.css
        .classed("aText",true) //from d3Style.css
        .text("Poverty")
});