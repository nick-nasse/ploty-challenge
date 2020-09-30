
// use d3 to read json into variable
d3.json("samples.json").then((sdata) => { 
    console.log(sdata)
});


// function for taking sampledata and populating dropdown
function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((sdata) => {

        sdata.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        })
    });
}

init();