import { useEffect, useState } from 'react'
import './App.css'

import searchIcon from './assets/search.png';
import clearIcon from './assets/clear.png';
import cloudIcon from './assets/cloud.png';
import drizzleIcon from './assets/drizzle.png';
import humidityIcon from './assets/humidity.jpeg';
import rainIcon from './assets/rain.jpeg';
import snowIcon from './assets/snow.jpeg';
import windIcon from './assets/wind.png';


const WeatherDetails=({ icon ,temp,city,country,lat,long,humidity,wind})=>{
 return( <>
  <div className='image'>
    <img src={icon} alt='image'/>
    </div>
  <div className="temp">{temp} °C</div>
  <div className="location">{city}</div>
  <div className="country">{country}</div>
  <div className="cord">
    <div> 
    <span>latitude</span>
      <span className="lat">{lat}</span>
    </div>
    <div>
    <span>longitude</span>
    <span className="long">{long}</span>
    </div>
    </div>
  </>
 );
};
const search=async ()=>{
  const apiid="1b7b0440c7a907c1b5a2b8733c6b2e7a";
  let url=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${apiid}&units=Metric`;
}
function App() {
  const[text,setText]=useState("London");
  const [icon, setIcon] = useState(snowIcon)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState("London");
  const[country,setCountry]=useState("GB");
  const[lat,setLat]=useState(0);
  const[log,setLog]=useState(0);
  const[humidity,setHumidity]=useState(0);
  const[wind,setWind]=useState(0);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);

  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":drizzleIcon,
    "03n":drizzleIcon,
    "04d":drizzleIcon,
    "04n":drizzleIcon,
    "09d":rainIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "13d":snowIcon,
    "13n":snowIcon
  }
  useEffect(function(){
    search()
  },[])
  const search=async ()=>{
    const apiid="1b7b0440c7a907c1b5a2b8733c6b2e7a";
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiid}&units=Metric`;
    const val=await fetch(url);
    const dat=await val.json();
    try{
     setLoading(true);
    if(dat.cod==='404'){
      console.error("city Not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(dat.main.humidity);
    setWind(dat.wind.speed);
     setTemp(Math.floor(dat.main.temp));
     setCity(dat.name);
     setCountry(dat.sys.country);
     setLat(dat.coord.lat);
     setLog(dat.coord.lon);
     const data=dat.weather[0].icon;
     setIcon(weatherIconMap[data]||clearIcon);
     setCityNotFound(false);
    }
    catch(error){
        console.log("An error occured+ ",error.message);
        setError(error);
    }
    finally{
      setLoading(false);
    }
  }
  const handleCity=(e)=>{
    setText(e.target.value);
  }
  const handleSearch=(e)=>{
    if(e.key==='Enter') search();
  }
  function App2(){
    return( 
    <><div className='data-container'>
    <div className='element'>
       <img src={humidityIcon} width='90px'></img>
       <div>
         <div class='humidity-percent'>{humidity} %</div>
         <div className="text">Humidity</div>
       </div>
    </div>
    <div className='element1'>
       <img src={windIcon} width='90px'></img>
       <div>
         <div class='wind-percent'>{wind} km/hr</div>
         <div className="text">Wind Speed</div>
       </div>
    </div>
   </div>
   <p className="copyright">
     Designed by<span>  kishokkumar</span>
   </p>
 </>);
  };
  return (
    <>
     <div className="container">
     <div className='input-container'>
      <input type='text' className='cityInput' placeholder='Search city' onChange={handleCity} onKeyDown={handleSearch} value={text}></input>
      <div className='search-icon'>
        <img src={searchIcon} alt="search"  width='40px' onClick={()=>search()}></img>
      </div>
      </div>
      {loading && <div style={{textAlign:'center'}}>Loading...</div>}
      {error && <div style={{textAlign:'center'}}>{error}</div> }
      {cityNotFound && <div style={{textAlign:'center'}}>cityNotFound</div>}
      {!loading && !cityNotFound && <><WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} long={log} humidity={humidity} wind= {wind}/><App2/></>}
    </div>
    </>
  )
}

export default App

/*
https://api.openweathermap.org/data/2.5/weather?q=London&appid=1b7b0440c7a907c1b5a2b8733c6b2e7a&unit=Metric
*/