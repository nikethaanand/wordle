import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import wordExists from 'word-exists';


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
      loss(true);// Notify HardLevel component that the row is completed
    }
  }, [gameWon, onGameWon,loss]);

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

  const submit = () => {
    const inputCheck = inputValues.join('');
    if (gameWon || submitted || !enableSubmit || !inputValues.every(value => /[a-zA-Z]/.test(value)) || !wordExists(inputCheck)) {
      return;
    }
    const mapVal = new Map();

    setSubmitted(true);
    for (let i = 0; i < generatedWord.length; i++) {
      if (mapVal.has(generatedWord.charAt(i))) {
        mapVal.set(generatedWord.charAt(i), mapVal.get(generatedWord.charAt(i)) + 1);
      } else {
        mapVal.set(generatedWord.charAt(i), 1);
      }
    }

    if (inputValues.join('') === generatedWord) {
      const newColor = Array(wordLength).fill('green');
      setColor(newColor);
      setGameWon(true);
      loss(true);
      onGameWon(true);
    } else {
      const newColor = [...color]; // Create a copy of the existing color array

      for (let i = 0; i < generatedWord.length; i++) {
        if (inputValues[i] === generatedWord.charAt(i)) {
          newColor[i] = 'green';
          mapVal.set(inputValues[i], mapVal.get(inputValues[i]) - 1);
        }
      }

      for (let i = 0; i < generatedWord.length; i++) {
        if (newColor[i] !== 'green' && mapVal.get(inputValues[i]) > 0) {
          newColor[i] = 'yellow';
          mapVal.set(inputValues[i], mapVal.get(inputValues[i]) - 1);
        } else if (newColor[i] !== 'green' && !mapVal.has(inputValues[i])) {
          newColor[i] = 'grey';
        } else if (newColor[i] !== 'green' && mapVal.get(inputValues[i]) <= 0) {
          newColor[i] = 'grey';
        }
      }

      setColor(newColor); // Update the color state with the new array
      onGameWon(false); // Notify the HardLevel component to move to the next row
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
            disabled={submitted || gameWon} // Disable input when the row is completed or game is won
            style={{ backgroundColor: submitted ? color[index] : 'white' }}
            ref={inputRefs[index]}
          />
        ))}
       {enableSubmit && (
  <>
            <button className="submit-button" onClick={submit} disabled={submitted || gameWon}>
              Submit
            </button>
  </>
)}
             {gameWon && (<>
          <p>You won the game! The word you guessed is {generatedWord}</p>
          <Link to="/level">
          <button className="home-button">Replay Game </button>
          </Link></>
        )}
      </section>
    </div>
  );
}

export default WordValidation;
