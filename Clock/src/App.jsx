import { useState,useEffect } from 'react'
import './App.css'

function App() {
   const [currentTime,setCurrentTime]=useState(new Date());
   useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentTime(new Date());
    },1000);
    return ()=>clearInterval(timer);
   },[]);
   const lead=(num)=>{
     return num<10?`0${num}`:num;
   }
   const formathour=(hour)=>{
     return hour==0?12:hour>12?hour-12:hour;
   }
   const formatd=(date)=>{
    const option={weekday:"long",year:"numeric",month:"long",day:"numeric"};
      return date.toLocaleDateString(undefined,option);
   }
  return (
    <>
      <div className='digital-clock'>
        <h1>Digital Clock</h1>
        <div class="time">{lead(formathour(currentTime.getHours()))} :
        {lead(currentTime.getMinutes())} :{lead(currentTime.getSeconds())}</div>
        <div className="date">{formatd(currentTime)}</div>
      </div>
    </>
  )
}

export default App
