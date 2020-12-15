import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from './util';
import Graph from './Graph';
import "leaflet/dist/leaflet.css";


// Api link = https://disease.sh/v3/covid-19/countries


function App() {

  // Using useState Hook --- craete state variable
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter]=useState({lat:34.80746 , lng: -40.4796});
  const [zoomMap, setZoomMap]=useState(3);
  const [mapCountries, setMapCountries]= useState([]);


  const getCountryName = async (e) => {
    const countryName = e.target.value;
    

    const url= 
      countryName === "WorldWide" ? "https://disease.sh/v3/covid-19/all" : 
      `https://disease.sh/v3/covid-19/countries/${countryName}`

      await fetch(url)
      .then((response) => response.json())
      .then ((data) =>{

        // this gonna update tha country name
        setCountry(countryName);

        // this data contain all the data
        setCountryInfo(data);
       

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setZoomMap(4);
     
      });
  };



  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            
          })         
          );

          const sortedData= sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        
          
          
        });
        
    };
    getCountriesData();
 }, []);

useEffect(()=> {
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response)=> response.json())
  .then((data)=> {
    setCountryInfo(data);
  })
}, []);

  return (
    <div className='app'>
      <div className="app__left">

        {/* Header Left */}
        <div className='app__header'>
          <h1>COVID-19 TRACKER</h1>

          <FormControl className='app__dropdown'>
            <Select variant="outlined" value={country} onChange={getCountryName}>

              <MenuItem value='WorldWide's>Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
              }

            </Select>
          </FormControl>

        </div>

        <div className="app__stats">
          <InfoBox 
          title="Carona Virus Cases:" 
          cases= {countryInfo.todayCases} 
          total={countryInfo.cases} />

          <InfoBox 
          title="Recovered:" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered} />

          <InfoBox 
          title="Deaths:" 
          cases= {countryInfo.todayDeaths} 
          total={countryInfo.deaths} />
        </div>

        <Map countries={mapCountries} center={mapCenter}  zoom={zoomMap} />
      </div>

        
          <Card className="app__right" variant="outlined">
            <CardContent>
              <h3>Live Data Of Covid-19</h3>
              <Table countries={tableData}/>
              
              <Graph  />
            </CardContent>
          </Card>

        

        </div>

  

  );
}

export default App;
