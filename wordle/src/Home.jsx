import Level from "./level";
import './wordle.css'
import Wordlelogo from './assets/wordle.png'
import { Link } from "react-router-dom";

const Home = () => {
    const imageStyle = {
        width: "200px",
        height: "180px",
        marginTop: "50px", 
      };

      
    return(
    <div className=" parent-container">
        <img src={Wordlelogo} alt="Wordlelogo" style={imageStyle}/>
        <h4>Play the Game.</h4>
        <div >
                <Link to="/level">
                    <button className="home-button">Play the Game </button>
                </Link>
                <Link to="/rules">
                    <button className="home-button">Rules of the Game </button>
                </Link>
               
            </div>
    </div>

    )
  };
  
  export default Home;