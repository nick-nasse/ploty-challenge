
// function for creating bar graph 
function plotting(subject) {

    // use d3 to read json into variable
    d3.json("samples.json").then((sdata) => { 
        console.log(sdata)

        // create variables to store values from sample data
        var samples = sdata.samples.filter(a => a.id.toString() === subject)[0];

        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        var top_otu = (samples.otu_ids.slice(0, 10)).reverse();

        var id_otu = top_otu.map(b => "OTU " + b)

        var labels = samples.otu_labels.slice(0, 10);

        // Plot Bar Graph
        var trace1 = {
            x: samplevalues,
            y: id_otu,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        var bar_data = [trace1];

        var bar_layout = {
            title: "OTU - Top 10",
        };

        Plotly.newPlot("bar", bar_data, bar_layout);

        // Plot Bubble Graph 
        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        var bubble_data = [trace2];

        var bubble_layout = {
            title: "OTU ID",
        }
        
        Plotly.newPlot("bubble", bubble_data, bubble_layout);
    });
};

// demographic info functions
function graphicinfo(subject) {
        d3.json("samples.json").then((sdata)=> {

            var metadata = sdata.metadata;
    
            var results = metadata.filter(meta => meta.id.toString() === subject)[0];
          
            var demographic = d3.select("#sample-metadata");
            
           demographic.html("");
    
            Object.entries(results).forEach((key) => {   
                demographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
}


// change event function
function optionChanged(subject) {
    plotting(subject);
    graphicinfo(subject);
}

// function for taking sampledata and populating dropdown
function init() {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then((sdata) => {

        sdata.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        plotting(sdata.names[0]);

        graphicinfo(sdata.names[0]);
    });
}

init();