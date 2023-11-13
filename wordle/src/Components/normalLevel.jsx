import React, { useState, useEffect } from 'react';
import WordValidation from './wordValidation';
import wordExists from 'word-exists';
import Wordlelogo from '../assets/wordle.png';
import { Link } from 'react-router-dom';
import ReplayIcon from '@mui/icons-material/Replay';
import { IconButton } from '@mui/material';
import '../wordle.css'

const NormalLevel = () => {
  const [generatedWord, setGeneratedWord] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [loss, setLoss] = useState(false);
 const imageStyle = {
    width: "200px",
    height: "180px",
    marginTop: "50px",
    marginLeft: "20px"
      };

      function refreshPage() {
        window.location.reload(false);
      }
      
      useEffect(() => {
        // Check if the game has been won 
        if (gameWon && currentRow === 6) {
          console.log("Game won!");
        }
      }, [gameWon, currentRow,loss]);

      useEffect(() => {
        if (!generatedWord) {
          generateRandomWord();
        }
      }, [generatedWord]);

      //Randomly generate a 6 digit word
      const generateRandomLetterWord = () => {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let word = '';
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          word += characters.charAt(randomIndex);
        }
        return word;
      };

      //Check if the word is valid
      const generateRandomWord = () => {
        while (true) {
          const randomWord = generateRandomLetterWord();
          if (wordExists(randomWord)) {
            setGeneratedWord(randomWord);
            break;
          }
        }
      };

      const handleGameWon = () => {
        if (!gameWon) {
          setCurrentRow((prevRow) => (prevRow < 6 ? prevRow + 1 : prevRow));
        }
      };
  //uncomment to test the code
  // console.log(generatedWord);
  return (
    <div >
        <div className="section-container" style={{ display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', width: '100%', margin: '0', 
        textAlign: 'center' }}>
          
        <img src={Wordlelogo} alt="Wordlelogo" style={imageStyle}/>

        <Link to="/hardLevel">
            <IconButton onClick={refreshPage}>
              <ReplayIcon  />
            </IconButton>
          </Link>
      </div>
          {[...Array(6)].map((_, index) => (
            <div key={index} className="section-container">
              <WordValidation
                key={index}
                wordLength={6}
                generatedWord={generatedWord}
                shouldContinue={index === currentRow}
                onGameWon={handleGameWon}
                enableSubmit={index === currentRow && currentRow < 6}
                loss={setLoss}
              />
            </div>
          ))}

        {currentRow === 6 && (
            <div className="section-container">

              {!loss ? (
                <>
                  <p>You Lost the game! The word is {generatedWord}</p>
                  <Link to="/level">
                    <button className="home-button">Replay Game</button>
                  </Link>
                </>
              ) : null}
            </div>
          )}


    </div>
  );
};

export default NormalLevel;
