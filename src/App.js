import React from 'react'
import './App.css';
import { weatherAPI,getGeolocation,forcastAPI } from './API';
import ForcastCard from './ForcastCard';

function App() {
  const [city, setCity] = React.useState()
  const [data, setData] = React.useState({})
  const [forcastData,setForcastData] = React.useState([])

  React.useEffect(()=>{
    async function fetchData(){
      try{
        const [_,weatherData,forcast] = await Promise.all([getGeolocation(),
          getGeolocation().then(({latitude,longitude})=>weatherAPI(null,latitude,longitude)),
          getGeolocation().then(({latitude,longitude})=>forcastAPI(null,latitude,longitude))])
        console.log(forcast)
        setData(weatherData)
        setForcastData(forcast)
      }
      catch(e){
        console.log(e)
      }
    }
    fetchData()
  },[])
  const handleSubmit = async () => {
    const [resCurrent,resForecast] = await Promise.all([weatherAPI(city),forcastAPI(city)]) 
    setData(resCurrent)
    setForcastData(resForecast)
  }
  return (
    <div className="App">
      <div className='search-container'>
        <input type='string' value={city} onChange={(e) => setCity(e.target.value)} />
        <button onClick={handleSubmit} className='button'>Search Weather</button>
      </div>
      <div>
        {
          Object.values(data).length>0 && (
            <>
            <h2>{data.location.name}'s weather</h2>
            <h3>Temparature : {data.current.temp_c}</h3>
            <h3>Feels Like : {data.current.feelslike_c}</h3>
            <h3>Humidity : {data.current.humidity}</h3>
            <h3>Wind Speed (KPH) : {data.current.wind_kph}</h3>
            </>

          )
        }
      </div>
      <div>
        <h1>Forcasts</h1>
        <div className='forcast-container'>
            {forcastData?.forecast?.forecastday && forcastData.forecast.forecastday.map(data=>{
              return (
                <ForcastCard data={data}/>
              )
            })}
        </div>
        
      </div>
    </div>
  );
}

export default App;
