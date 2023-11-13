import React from "react";
import { Link } from "react-router-dom";

const Rules = () => {
  return (
    <div className="parent-container1">
      <h1 className="heading-main1">Wordle Rules</h1>
      <ol>
        <li>You have to guess the Wordle in six goes or less depending on the level.</li>
        <li>
          Every word you enter must be in the word list. There are more than 10,000 words in
          this list, but only 2,309 (at the time of writing) are answers to a specific puzzle
        </li>
        <li>Only a valid word will be accepted as an attempt</li>
        <li>You cannot submit a word less than the word size</li>
        <li>Letter will be converted to Lowercase </li>
        <li>A correct letter turns green</li>
        <li>A correct letter in the wrong place turns yellow</li>
        <li>An incorrect letter turns grey</li>
        <li>Letters can be used more than once</li>
        <li>Normal level has a 6 letter word and 6 attempts</li>
        <li>Hard Level has a 7 letter word with 5 attempts</li>
      </ol>
      <h4>Good Luck! Enjoy the Game!</h4>
      <Link to="/level">
        <button className="home-button">Play the Game</button>
      </Link>
    </div>
  );
};

export default Rules;
