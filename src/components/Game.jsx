import React, { useState, useEffect } from 'react';
import './styles.css';
import Cookies from 'js-cookie';

const Game = () => {
  const [money, setMoney] = useState(parseInt(Cookies.get('money')) || 0);
  const [result, setResult] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  useEffect(() => {
    Cookies.set('money', money);
  }, [money]);

  let arraySimboli = ['😈', '👻', '👽'];

  if (difficulty === 'medium') {
    arraySimboli = ['🩸', '🌑', '🔮', '🤖', '👾'];
  } else if (difficulty === 'hard') {
    arraySimboli = ['🥷', '🦹', '🎭', '🧜‍♂️', '🧠', '👹', '💀', '💩', '🧙‍♂️', '🪐'];
  }

  const MoneyBalance = ({ money }) => {
    return (
      <div className="money-box">
        <h4>Balance:</h4>
        <p>${money}</p>
      </div>
    );
  };

  const handleGameStart = () => {
    document.getElementById("button-slot").disabled = true;

    const attempts = numberAttempts(3, 12);

    let t1 = 0, t2 = 0, t3 = 0;

    let slot1 = setInterval(function () {
      const numberRandom = generaRandom(arraySimboli.length);
      document.getElementById("slot1").innerHTML = arraySimboli[numberRandom];
      t1++;
      if (t1 === attempts) {
        clearInterval(slot1);
        return null;
      }
    }, 100);

    let slot2 = setInterval(function () {
      t2++;
      if (t2 === attempts) {
        clearInterval(slot2);
        return null;
      }
      const numberRandom = generaRandom(arraySimboli.length);
      document.getElementById("slot2").innerHTML = arraySimboli[numberRandom];
    }, 200);

    let slot3 = setInterval(function () {
      t3++;
      if (t3 === attempts) {
        clearInterval(slot3);
        checkResult();
        document.getElementById("button-slot").disabled = false;
        return null;
      }
      const numberRandom = generaRandom(arraySimboli.length);
      document.getElementById("slot3").innerHTML = arraySimboli[numberRandom];
    }, 300);
  };

  const checkResult = () => {
    const slot1Value = document.getElementById("slot1").innerHTML;
    const slot2Value = document.getElementById("slot2").innerHTML;
    const slot3Value = document.getElementById("slot3").innerHTML;

    if (slot1Value === slot2Value && slot2Value === slot3Value) {
      setResult('YOU WON');
      if (difficulty === 'easy') {
        setMoney(money + 50);
      } else if (difficulty === 'medium') {
        setMoney(money + 1000);
      } else if (difficulty === 'hard') {
        setMoney(money + 10000);
      }
    } else {
      setResult('YOU LOST');
      setMoney(money - 1);
    }
  };

  function generaRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function numberAttempts(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  return (
    <div className="game">
      <h2 id="title">Slot Machine Game</h2>
      <div className="difficulty-container">
        <label htmlFor="difficulty" className="difficulty-label">Choose Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="difficulty-select"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <MoneyBalance money={money} />
      <section className="slots">
        <div id="slot1" className="icons"></div>
        <div id="slot2" className="icons"></div>
        <div id="slot3" className="icons"></div>
      </section>
      <button id="button-slot" onClick={handleGameStart}>
        Press the button and play!
      </button>
      <div id="result">{result}</div>
    </div>
  );
};

export default Game;