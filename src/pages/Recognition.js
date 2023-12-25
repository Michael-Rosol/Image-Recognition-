import React, { useEffect, useState, useRef } from 'react';
import "./Recognition.css";

import * as mobilenet from "@tensorflow-models/mobilenet"; 
import * as tf from '@tensorflow/tfjs';


const Recognition = () => {

  const [isModelLoading, setIsModelLoading] = useState(false); 
  const [model, setModel] = useState(null); 
  const [imageURL, setImageURL] = useState(null); 
  const [results, setResults] = useState([])

  const imageRef = useRef() 

  const loadModel = async () => {
    setIsModelLoading(true)
    try {
        const model = await mobilenet.load()
        setModel(model)
        setIsModelLoading(false)
    } catch (error) {
        console.log(error)
        setIsModelLoading(false)
    }
}

  const uploadImage = (e) => {
    const {files} = e.target
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0])
      setImageURL(url)
    } else {
      setImageURL(null); 
    }
  }

  const identify = async () => {
    // Check if the model is available
    if (model) {
      try {
        const results = await model.classify(imageRef.current);
        console.log(results);
        setResults(results); 
      } catch (error) {
        console.error("Error during classification:", error);
      }
    } else {
      console.error("Model is not loaded yet.");
    }
  };

  useEffect( () => {
    loadModel() 
  }, []); 

  console.log(results)

  if(isModelLoading) {
    return <h2>Model Loading...</h2>
  }



  return (
  
    <div className='elements'>
      <h1 className='header'>Image Processor </h1>
     
      <div className='inputholder'>
      <label className='uploadlabel'> Select Your Image: </label>
        <input type='file' accept='image/*' capture='camera' className='imageupload' 
        onChange={uploadImage}/>
      </div>
      <div className='mainWrapper'>
        <div className='mainContent'>
          <div className='imageHolder'> 
              {imageURL && <img src={imageURL} alt='Upload Preview' crossOrigin='anonymous' 
              ref={imageRef}/> }
              {imageURL && <button className='idbutton' onClick={identify}> Identify Image </button>} 
          </div>
            
          {results.length > 0 && <div className='resultsHolder'>
                        {results.map((result, index) => {
                            return (
                                <div className='result' key={result.className}>
                                    <span className='name'>{result.className}</span>
                                    <span className='confidence'>Confidence level: {(result.probability * 100).toFixed(2)}% {index === 0 && <span className='bestGuess'>Best Guess</span>}</span>
                                </div>
                            )
                        })}
                    </div>}
        </div>
       
      </div>
    </div>
  );
};

export default Recognition;