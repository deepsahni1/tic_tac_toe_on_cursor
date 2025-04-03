import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'
import soundManager from './utils/sounds'

function Square({ value, onSquareClick, isWinningSquare, winDirection }) {
  const renderValue = () => {
    if (value === 'X') return <span className="x">{value}</span>;
    if (value === 'O') return <span className="o">{value}</span>;
    return null;
  };

  const handleClick = () => {
    if (onSquareClick) {
      soundManager.play('click');
      onSquareClick();
    }
  };

  return (
    <button 
      className={`square ${isWinningSquare ? `winning-square ${winDirection}` : ''}`} 
      onClick={handleClick}
    >
      {renderValue()}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const { winner, winningLine, winDirection } = winnerInfo || { winner: null, winningLine: null, winDirection: null };

  function handleClick(i) {
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square 
          value={squares[0]} 
          onSquareClick={() => handleClick(0)} 
          isWinningSquare={winningLine && winningLine.includes(0)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[1]} 
          onSquareClick={() => handleClick(1)} 
          isWinningSquare={winningLine && winningLine.includes(1)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[2]} 
          onSquareClick={() => handleClick(2)} 
          isWinningSquare={winningLine && winningLine.includes(2)}
          winDirection={winDirection}
        />
      </div>
      <div className="board-row">
        <Square 
          value={squares[3]} 
          onSquareClick={() => handleClick(3)} 
          isWinningSquare={winningLine && winningLine.includes(3)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[4]} 
          onSquareClick={() => handleClick(4)} 
          isWinningSquare={winningLine && winningLine.includes(4)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[5]} 
          onSquareClick={() => handleClick(5)} 
          isWinningSquare={winningLine && winningLine.includes(5)}
          winDirection={winDirection}
        />
      </div>
      <div className="board-row">
        <Square 
          value={squares[6]} 
          onSquareClick={() => handleClick(6)} 
          isWinningSquare={winningLine && winningLine.includes(6)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[7]} 
          onSquareClick={() => handleClick(7)} 
          isWinningSquare={winningLine && winningLine.includes(7)}
          winDirection={winDirection}
        />
        <Square 
          value={squares[8]} 
          onSquareClick={() => handleClick(8)} 
          isWinningSquare={winningLine && winningLine.includes(8)}
          winDirection={winDirection}
        />
      </div>
    </div>
  );
}

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const isDraw = !winner && currentSquares.every(square => square);

  // Trigger confetti and sound effects when there's a winner or draw
  useEffect(() => {
    if (winner) {
      // Play victory sound
      soundManager.play('victory');
      
      // Show confetti
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 300);
    } else if (isDraw) {
      // Play draw sound
      soundManager.play('draw');
    }
  }, [winner, isDraw]);

  // Toggle sound effects
  const toggleSound = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    soundManager.setMute(!newSoundState);
  };

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <div className="game">
      <div className="game-title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-controls">
        <button className="reset-button" onClick={resetGame}>Reset Game</button>
        <button className="sound-button" onClick={toggleSound}>
          {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // horizontal top
    [3, 4, 5], // horizontal middle
    [6, 7, 8], // horizontal bottom
    [0, 3, 6], // vertical left
    [1, 4, 7], // vertical middle
    [2, 5, 8], // vertical right
    [0, 4, 8], // diagonal top-left to bottom-right
    [2, 4, 6], // diagonal top-right to bottom-left
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // Determine the direction of the winning line
      let winDirection = 'horizontal';
      if (i >= 3 && i <= 5) {
        winDirection = 'vertical';
      } else if (i === 6) {
        winDirection = 'diagonal-1';
      } else if (i === 7) {
        winDirection = 'diagonal-2';
      }

      return {
        winner: squares[a],
        winningLine: lines[i],
        winDirection: winDirection
      };
    }
  }
  return null;
}

export default App
