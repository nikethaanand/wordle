import Level from "./level";
import './wordle.css'
import Wordlelogo from './assets/wordle.png'
import { Link } from "react-router-dom";

const Home = () => {
    const imageStyle = {
        width: "200px",
        height: "180px",
        marginTop: "50px", // Add margin-top
      };

      
    return(
    <div className=" parent-container">
        {/* <h1 className="heading-main">Wordle </h1> */}
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
        {/* <Level/> */}
    </div>

    )
  };
  
  export default Home;