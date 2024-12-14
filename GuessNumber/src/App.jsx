import React, { useState } from "react";
import "./App.css"

function App() {
  const [name, setName] = useState(""); 
  const [guess, setGuess] = useState(""); 
  const [result, setResult] = useState(""); 
  const [moves, setMoves] = useState(0); 
  const [computerNumber, setComputerNumber] = useState(""); 
  const [gameStarted, setGameStarted] = useState(false); 

  const startGame = () => {
    if (!name) {
      setResult("Please enter your name to start the game.");
      return;
    }

    setMoves(0);
    setGuess("");
    setResult("");
    setGameStarted(true); 

    const newNumber = generateRandomNumber();
    console.log("Generated computer number:", newNumber); // Debug log
    setComputerNumber(newNumber);
  };

  const generateRandomNumber = () => {
    const digits = [];
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }
    return digits.join("");
  };

  const makeGuess = () => {
    if (guess.length !== 4 || isNaN(guess)) {
      setResult("Please enter a valid 4-digit number.");
      return;
    }

    let plusCount = 0; 
    let minusCount = 0; 
    let guessArray = guess.split(""); 

    const computerArray = computerNumber.split(""); 
    let usedComputerDigits = []; 

    for (let i = 0; i < 4; i++) {
      if (guessArray[i] === computerArray[i]) {
        plusCount++; 
        usedComputerDigits.push(computerArray[i]); 
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessArray[i] !== computerArray[i] && computerArray.includes(guessArray[i]) && !usedComputerDigits.includes(guessArray[i])) {
        minusCount++; 
        usedComputerDigits.push(guessArray[i]); 
      }
    }

    const guessValue = parseInt(guess, 10);
    const computerValue = parseInt(computerNumber, 10);
    let highLowMessage = "";
    
    if (guessValue < computerValue) {
      highLowMessage = "Your guess is too low.";
    } else if (guessValue > computerValue) {
      highLowMessage = "Your guess is too high.";
    }

    setMoves((prevMoves) => prevMoves + 1);
    setResult(`${highLowMessage} ${"+".repeat(plusCount)}${"-".repeat(minusCount)}`);

    if (plusCount === 4) {
      setResult(`Congratulations, ${name}! You guessed the number in ${moves + 1} moves.`);
    }
  };

  const resetGame = () => {
    setGuess("");
    setResult("");
    setMoves(0);
    setComputerNumber("");
    setGameStarted(false); 
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Guess the Number Game</h1>

      {!gameStarted && (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={startGame}>Start Game</button>
        </div>
      )}

      {gameStarted && (
        <div>
          <h3>Welcome, {name}!</h3>
          <input
            type="text"
            placeholder="Enter your guess (4 digits)"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            maxLength="4"
            disabled={result && result.startsWith("Congratulations")}
          />
          <button
            onClick={makeGuess}
            disabled={result && result.startsWith("Congratulations")}
          >
            Submit Guess
          </button>
          <br />
          <h4>{result}</h4>
          <p>Moves: {moves}</p>

          <button onClick={resetGame} style={{ marginTop: "20px" }}>
            New Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
