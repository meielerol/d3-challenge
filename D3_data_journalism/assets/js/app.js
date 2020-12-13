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

// initial params
let chosenXAxis = "obesity";
let chosenYAxis = "age";

// function for updating x and y scale variables upon click on axis label
// 20% domain buffer from minimum and maximum values
function xScale(updateData, chosenXAxis) {
    // create scales
    let xLinearScale = d3.scaleLinear()
        .domain([
            d3.min(updateData, data => data[chosenXAxis]) * 0.8,
            d3.max(updateData, data => data[chosenXAxis]) * 1.2
        ])
        .range([0,width]);

    return xLinearScale;
};
function yScale(updateData, chosenYAxis) {
    // create scales
    let yLinearScale = d3.scaleLinear()
        .domain([
            d3.min(updateData, data => data[chosenYAxis]) * 0.8,
            d3.max(updateData, data => data[chosenYAxis]) * 1.2
        ])
        .range([height,0]);

    return yLinearScale;
}

// function for updating xAxis variable uplong click on axis label
function renderAxes(updateXScale, xAxis) {
    let bottomAxis = d3.axisBottom(updateXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    
    return xAxis;
};

// function for updating circles group with transition to new circles
function renderCircles(circleGroup, updateXScale, chosenXAxis) {
    circleGroup.transition()
        .duration(1000)
        .attr("cx", data => updateXScale(data[chosenXAxis]));
    
    return circleGroup;
};

// select the data for the charts from the csv
d3.csv(dataUrl).then(data => {

    // parse data and make them integers
    data.forEach(data => {
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
    console.log("data",data);

    // xLinearScale & yLinearScale functions
    let xLinearScale = xScale(data, chosenXAxis);
    let yLinearScale = yScale(data, chosenYAxis);

    // create the initial axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // create/append the axis on the page
    // x axis
    let xAxis = chartGroup.append("g")
        .classed("x-axis",true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    // y axis
    chartGroup.append("g")
        .call(leftAxis);

    // create/append initial circles
    let circleGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 10)
        .attr("fill","lightblue")
        .attr("opacity","0.75")

    // let textGroup = chartGroup.selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .text(d => d.abbr)
    //     .attr("x", d => xLinearScale(d[chosenXAxis]))
    //     .attr("y", d => yLinearScale(d[chosenYAxis]))
    //     .attr("font-size","11px")
    //     .attr("fill", "black")

    // create the group for two x-axis labels
    let xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width/2},${height + 20})`); //centers text

    let obesityLabel = xlabelsGroup.append("text")
        .attr("x",0)
        .attr("y",20)
        .attr("value","obesity") //value to grab for event listener
        .classed("active", true)
        .text("Obesity %");
    
    let healthcareLabel = xlabelsGroup.apped("text")
        .attr("x",0)
        .attr("y",40)
        .attr("value","healthcare") //value to grab for event listener
        .classed("active", true)
        .text("Healthcare %");

    // append y axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height/2))
        .attr("dy", "1em")
        .classed("axis-text",true)
        .text("Age");

    // x axis labels event listener
    xlabelsGroup.selectAll("text")
        .on("click",function(){
            // get value of selection
            let value = d3.select(this).attr("value");
            if (value !== chosenXAxis) {
                chosenXAxis = value;
                console.log(chosenXAxis);

                xLinearScale = xScale(data, chosenXAxis);
                xAxis = renderAxes(xLinearScale, xAxis);

                circleGroup = renderCircles(circleGroup, xLinearScale, chosenXAxis);
                
                if (chosenXAxis === "healthcare") {
                    healthcareLabel
                        .classed("active", true)
                        .classed("inactive", false)
                    obesityLabel
                        .classed("active", false)
                        .classed("inactive", true)
                } else {
                    healthcareLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    obesityLabel
                        .classed("active", true)
                        .classed("inactive", false)
                }
            }
        });
});