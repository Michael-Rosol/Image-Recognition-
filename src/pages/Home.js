import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Home.css"

const Home = () => {

  let navigate = useNavigate(); 

  return (
    <div className='home'>
      <h1 className='home-header'>Home</h1>
      <div className='button-elements'>
     <button className='otherbutton' onClick={() => {
        navigate('/api')
      }}> NASA API Button </button>
      <button className='startbutton' onClick={() => {
        navigate('/recognition')
      }}> Image Recognition  </button>
      </div>
    </div>
  )
}

export default Home