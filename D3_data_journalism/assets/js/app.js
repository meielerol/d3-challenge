const dataUrl = "./assets/data/data.csv";

d3.csv(dataUrl).then(data => {
    console.log(data);

    // create the arrays to hold data
    let columns = data.columns;
    let id = [];
    let state = [];
    let abbr = [];
    let poverty = [];
    let age = [];
    let income = [];
    let healthcare = [];
    let obesity = [];
    let smokes = [];

    // get a few different points of data
    Object.entries(data).forEach(([key,value]) => {
        // console.log(key,value.state);
        id.push(parseInt(value.id));
        state.push(value.state);
        abbr.push(value.abbr);
        poverty.push(parseInt(value.poverty));
        age.push(parseInt(value.age));
        income.push(parseInt(value.income));
        healthcare.push(parseInt(value.healthcare));
        obesity.push(parseInt(value.obesity));
        smokes.push(parseInt(value.smokes));
    });

    // remove the last random column/value
    columns = columns.slice(0,columns.length - 1);
    id = id.slice(0,id.length - 1);
    state = state.slice(0,state.length - 1);
    abbr = abbr.slice(0,abbr.length - 1);
    poverty = poverty.slice(0,poverty.length - 1);
    age = age.slice(0,age.length - 1);
    income = income.slice(0,income.length - 1);
    healthcare = healthcare.slice(0,healthcare.length - 1);
    obesity = obesity.slice(0,obesity.length - 1);
    smokes = smokes.slice(0,smokes.length - 1);

    // check the arrays
    console.log("columns",columns);
    console.log("id",id);
    console.log("state",state);
    console.log("abbr",abbr);
    console.log("poverty",poverty);
    console.log("age",age);
    console.log("income",income);
    console.log("healthcare",healthcare);
    console.log("obesity",obesity);
    console.log("smokes",smokes);
});