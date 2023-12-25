import React, { useState } from 'react'
import { useEffect } from 'react'

import "./Api.css"

const Api = () => {

  const [photoData, setPhotoData] = useState(null)

 
  useEffect(() => {

    fetchPhoto(); 

    async function fetchPhoto() {
      const apiKey = process.env.REACT_APP_NASA_API_KEY;
      const res = await fetch (
        
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      ); 
      const data = await res.json(); 
      setPhotoData(data); 
      console.log(data)
    }
  }, []); 

  if(!photoData) {
    return <div />
  }


  return (
    <div className='nasa-container'>
        <img className='nasaimage' src={photoData.url} alt={photoData.title}/>
        <div className='nasa-wording'>
          <h1 className='title'>{photoData.title}</h1>
          <p className='date'><b>Date:</b> &nbsp; {photoData.date}</p>
          <p className='explanation'>{photoData.explanation}</p>
        </div>
    </div>
  )
}

export default Api