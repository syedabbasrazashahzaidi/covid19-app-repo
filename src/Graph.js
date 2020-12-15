import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';


const options={
    legend:{
        display:false,
     },
    elments:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode: "index" ,
        intersect: false ,
        callbacks:{
        label: function (tooltipItem, data){
            return numeral(tooltipItem.value).format("+0,0");  
        },
        },
    },
// },
    scales:{
        xAxes: [{
            type: "time",
            time:{
                format:'MM/DD/YY',
                tooltipFromat: 'll',
            },  
        },],

        yAxes:[{
            gridLines:{
                dispaly:false,
            },
            ticks:
            {
                callback: function (value, index, values){
                    return numeral(value).format("0a");
                },
            },
        },],
    },
};

const buildChartData = (data, caseType)  => {
    const chartData = [];
    let lastDataPoint;
    // data.caseType.forEach(data =>
    for( let date in data.cases) {
        if(lastDataPoint) {
                const newDataPoint={
                    x:date,
                    y: data[caseType][date]-lastDataPoint                  
                }
                    chartData.push(newDataPoint);
        }
        lastDataPoint= data[caseType][date];
    }
    return chartData;
}

function LineGraph({caseType='cases'}){
//https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        const fetchData= async ()=>{
    await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
    .then((response) => {
        return response.json();
})     
    .then((data) => {
        let chartData = buildChartData(data, "cases")
        setData(chartData);
    })
}
    fetchData();
    }, [caseType]);




    const [data, setData] = useState({})
    return (
        <div>
            {data?.length > 0 && (
                <Line 
                options={options}
                data= {{
                     datasets:[{
                            backgroundColor: 'pink',
                            borderColor: 'red',
                            data:data, 
                    }]

                    }}
                
              
            
            
            />
            )}
        </div>
    
    )}



          
            


export default LineGraph;


