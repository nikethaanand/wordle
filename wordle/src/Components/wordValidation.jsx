import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import wordExists from 'word-exists';
import '../wordle.css'


function WordValidation({ wordLength, generatedWord, shouldContinue, onGameWon, enableSubmit,loss }) {
  const [inputValues, setInputValues] = useState(Array.from({ length: wordLength }, () => ''));
  const [submitted, setSubmitted] = useState(false);
  const [color, setColor] = useState(Array.from({ length: wordLength }, () => 'white'));
  const [gameWon, setGameWon] = useState(false);
  const inputRefs = Array.from({ length: wordLength }, () => useRef(null));
  const[valid,setValid]=useState(false);
    
    useEffect(() => {
      if (gameWon) {
        onGameWon(true); 
        loss(true);
      }
    }, [gameWon, onGameWon,loss]);

    //  Function handles the change once user types input
    const handleChange = (e, index) => {
      if (gameWon) {
        return;
      }
      
      const { value } = e.target;

      if (value.length === 1) {
        const updatedValues = [...inputValues];
        updatedValues[index] = value.toLowerCase();
        setInputValues(updatedValues);

        if (index < wordLength - 1) {
          if (inputRefs[index + 1].current) {
            inputRefs[index + 1].current.focus();
          }
        }
      }
    };

    //Function handles backspace and going to the next box
    const handleKeyDown = (e, index) => {
      if (gameWon) {
        return;
      }

      if (e.key === 'Backspace') {
        const updatedValues = [...inputValues];
        updatedValues[index] = '';
        setInputValues(updatedValues);

        if (index > 0 && inputRefs[index - 1].current) {
          inputRefs[index - 1].current.focus();
        }
      }
    };

    //Once the user presses the submit button it is called
      const submit = () => {
        //Joins the user input  and checks if the size is equal and if it is a valid word
        const inputCheck = inputValues.join('');
        if (gameWon || submitted || !enableSubmit || !inputValues.every(value => /[a-zA-Z]/.test(value)) || !wordExists(inputCheck)) {
          return;
        }
        const mapVal = new Map();
        setSubmitted(true);

        //mapVal contains values of all the occurences
        for (let i = 0; i < generatedWord.length; i++) {
          if (mapVal.has(generatedWord.charAt(i))) {
            mapVal.set(generatedWord.charAt(i), mapVal.get(generatedWord.charAt(i)) + 1);
          } else {
            mapVal.set(generatedWord.charAt(i), 1);
          }
        }
        //If the word is equal no need to check can automatically change to green.
        if (inputValues.join('') === generatedWord) {
          const newColor = Array(wordLength).fill('green');
          setColor(newColor);
          setGameWon(true);
          loss(true);
          onGameWon(true);
        } 
        else {
          const newColor = [...color]; 

          for (let i = 0; i < generatedWord.length; i++) {
            //If the current position is correct set to green at first before yellow and grey
            if (inputValues[i] === generatedWord.charAt(i)) {
              newColor[i] = 'green';
              mapVal.set(inputValues[i], mapVal.get(inputValues[i]) - 1);
            }
          }

          for (let i = 0; i < generatedWord.length; i++) {
            //Set to yellow if found
            if (newColor[i] !== 'green' && mapVal.get(inputValues[i]) > 0) {
              newColor[i] = 'yellow';
              mapVal.set(inputValues[i], mapVal.get(inputValues[i]) - 1);
            } //else set to grey
            else if (newColor[i] !== 'green' && !mapVal.has(inputValues[i])) {
              newColor[i] = 'grey';
            } else if (newColor[i] !== 'green' && mapVal.get(inputValues[i]) <= 0) {
              newColor[i] = 'grey';
            }
          }

          setColor(newColor); 
          onGameWon(false); 
          setGameWon(false);
        }
      };
  return (
    <div>
      <section>
       
        {inputValues.map((value, index) => (
          <input
            className="input-box"
            key={index}
            type="text"
            name={`name-${index + 1}`}
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            size="1"
            value={value}
            disabled={submitted || gameWon} 
            style={{ backgroundColor: submitted ? color[index] : 'white' }}
            ref={inputRefs[index]}
          />
        ))}
       {
        enableSubmit && (
          <>
            <button className="submit-button" onClick={submit} disabled={submitted || gameWon}>
              Submit
            </button>
          </>
          )
        }
        { gameWon && (<>
          <h3>You won the game! The word you guessed is {generatedWord}</h3>
          <Link to="/level">
          <button className="home-button">Replay Game </button>
          </Link></>
        )
        }
      </section>
    </div>
  );
}

export default WordValidation;
