function init() {
    d3.json("samples.json").then(data => {
        let names = data['names'];
        let metaData = data['metadata'];
        let samples = data['samples'];

        samplesData = []
        for (let sample of samples) {
           sample_data = {};
           sample_data['id'] = sample['id']
           sample_data['sample_values'] = sample['sample_values'].slice(0,10).reverse()
           
           let topTenOTUIDs = [];
            for (let elt of sample['otu_ids'].slice(0,10).reverse()) {
             topTenOTUIDs.push(String(`OTU ${elt}`))
            }
           
           sample_data['otu_ids'] = topTenOTUIDs
           sample_data['otu_labels'] = sample['otu_labels'].slice(0,10).reverse()
           samplesData.push(sample_data)
        };

        plotData = samplesData[0]
        console.log(plotData)
        
        trace1 = {
            x: plotData['sample_values'],
            y: plotData['otu_ids'],
            text: plotData['otu_labels'],
            type: 'bar',
            orientation: 'h'
        };

        let traces = [trace1];

        let layout = {
            title: 'Top 10 OTUs'
        };

        Plotly.newPlot("bar", traces, layout);
    });
d3.selectAll("#selDataset").on("change", optionChanged);

}

function optionChanged(value) {
    let dropdownMenu = d3.select('selDataSet');
    let dataset = dropdownMenu.text();



    Plotly.restyle("plot", "x", [x]);
    Plotly.restyle("plot", "y", [y]);
}

init();