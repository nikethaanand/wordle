
import React, { useState } from 'react';
import HardLevel from './Components/hardLevel';
import NormalLevel from './Components/normalLevel';
import { Outlet, Link } from "react-router-dom";
import Wordlelogo from './assets/wordle.png'

const Level = () => {

    return(
        <div className='parent-container'>
              <img src={Wordlelogo} alt="Wordlelogo" className='image-container'/>

             <h4>Play the Game.</h4>
             <div >
                <Link to="/game/normalLevel">
                    <button className="home-button">Normal </button>
                </Link>
                <Link to="/game/hardLevel">
                    <button className="home-button" >Hard </button>
                </Link>
            </div>

     </div>
    )
  };
  
  export default Level;