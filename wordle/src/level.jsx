
import React, { useState } from 'react';
import HardLevel from './hardLevel';
import NormalLevel from './normalLevel';
import { Outlet, Link } from "react-router-dom";
import Wordlelogo from './assets/wordle.png'

const Level = () => {

    return(
        <div className='parent-container'>
        {/* <p> The word limits are 6 letters and 7 attemps for Normal and 7 letters and 5
             attempts for Hard. Select the Level you want to play</p> */}
              <img src={Wordlelogo} alt="Wordlelogo" className='image-container'/>

             <h4>Play the Game.</h4>
             <div >
                <Link to="/game/hardLevel">
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