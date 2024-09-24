import React from 'react'
import './App.css'
export default function ForcastCard({data}){
    console.log('data',data)
    if(data.length===0) return;
    return (
        <div className='card'>
            <h4>Date:{data.date}</h4>
            <p>Avg Temp: {data.day.avgtemp_c}</p>
            <p>Min Temp: {data.day.mintemp_c}</p>
            <p>Max Temp: {data.day.maxtemp_c}</p>
            <p>Condition: {data.day.condition.text}</p>
        </div>
    )
}