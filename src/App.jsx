import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { GiRock } from 'react-icons/gi';
import { GiPaper } from 'react-icons/gi';
import { GiScissors } from 'react-icons/gi';
import { BsSun, BsMoon } from 'react-icons/bs';

function App() {
  const [lost, setLost] = useState(0);
  const [wins, setWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const sliderValue = useRef(0);
  const backgroundRef = useRef(null);
  const textColorRef = useRef(null);
  const userChoiceRef = useRef(null);
  const computerChoiceRef = useRef(null);
  const resultRef = useRef(null);

  const handleSliderChange = (event) => {
    backgroundRef.current.style.backgroundColor =
      event.target.value === '1' ? 'black' : 'white';
    textColorRef.current.style.color =
      event.target.value === '0' ? 'black' : 'white';
    userChoiceRef.current.style.color =
      event.target.value === '0' ? 'black' : 'white';
    computerChoiceRef.current.style.color =
      event.target.value === '0' ? 'black' : 'white';
    resultRef.current.style.color =
      event.target.value === '0' ? 'black' : 'white';
  };

  function handleDivClick(event, choice) {
    setUserChoice(choice);
  }

  const handleSliderClick = () => {
    const sliderValue = sliderValue.current.value;
    if (sliderValue === '0') {
      backgroundRef.current.style.backgroundColor = 'black';
      textColorRef.current.style.color = 'white';
    } else {
      backgroundRef.current.style.backgroundColor = 'white';
      textColorRef.current.style.color = 'black';
    }
  };

  const options = ['Rock', 'Paper', 'Scissors'];

  useEffect(() => {
    if (userChoice === '') return;

    const computerIndex = Math.floor(Math.random() * 3);
    const computerChoice = options[computerIndex];

    setComputerChoice(computerChoice);

    if (userChoice === computerChoice) {
      setDraws(draws + 1);
      setResult('Draw!');
    } else if (
      (userChoice === 'Rock' && computerChoice === 'Scissors') ||
      (userChoice === 'Paper' && computerChoice === 'Rock') ||
      (userChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
      setWins(wins + 1);
      setResult('You won!');
    } else {
      setLost(lost + 1);
      setResult('You lost!');
    }

    setTimeout(() => {
      setUserChoice('');
      setComputerChoice('');
      setResult('');
    }, 2000);
  }, [userChoice]);

  return (
    <div className="app-container" ref={backgroundRef}>
      <div className="navbar">
        <div className="logo-box" ref={textColorRef}>
          <span className="logo-G">
            G <GiRock className="logo-rock" />
          </span>
          <span className="logo-A">
            A <GiPaper className="logo-paper" />
          </span>
          <span className="logo-M">
            M <GiScissors className="logo-scissors" />
          </span>
          <span className="logo-E">E</span>
          <div className="sliderBox">
            <BsSun></BsSun>
            <input
              className="slider"
              type="range"
              min="0"
              max="1"
              step={null}
              ref={sliderValue}
              onChange={handleSliderChange}
              onClick={handleSliderClick}
            />
            <BsMoon></BsMoon>
          </div>
        </div>
      </div>
      <div className="choice-box">
        <div
          className="rock"
          data-value="rock"
          onClick={(e) => handleDivClick(e, 'Rock')}
        >
          <GiRock className="icons" />
          <span className="icon-text">ROCK</span>
        </div>
        <div
          className="paper"
          data-value="paper"
          onClick={(e) => handleDivClick(e, 'Paper')}
        >
          <GiPaper className="icons" />
          <span className="icon-text">PAPER</span>
        </div>
        <div
          className="scissors"
          data-value="scissors"
          onClick={(e) => handleDivClick(e, 'Scissors')}
        >
          <GiScissors className="icons" />
          <span className="icon-text">SCISSORS</span>
        </div>
      </div>
      <div className="stats-box">
        <span className="userChoiceMessage" ref={userChoiceRef}>
          Your choise: {userChoice}
        </span>
        <span className="computerChoiceMessage" ref={computerChoiceRef}>
          Computer choise: {computerChoice}
        </span>
        <span className="resultMessage" ref={resultRef}>
          Result: {result}
        </span>
        <div className="stats">
          <span className="wins">Wins: {wins}</span>
          <span className="lost">Lost: {lost}</span>
          <span className="draws">Draws: {draws}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
