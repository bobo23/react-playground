import { useState, useCallback } from 'react';
import Layout from './Layout';
import Square from './Square';

interface SquaresValue {
  squares: string[]
}
interface StatusValue {
  end: null|string,
  xIsNext: boolean
}

function calculateEnd({ squares }: SquaresValue) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  if (squares.every(s => s.length > 0)) {
    return 'draw';
  }

  return null;
}

function getStatus({ end, xIsNext }: StatusValue) {
  if (end && end === 'draw') {
    return 'That\'s a draw!';
  }
  if (end) {
    return end + ' wins!';
  }

  return 'Next player: ' + (xIsNext ? 'X' : 'O');
}

export default function TixTacToe() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));

  const handleClick = useCallback((index: number) => {
    if (squares[index] || calculateEnd({ squares })) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }, [squares, xIsNext]);

  function handleReset() {
    setSquares(Array(9).fill(''));
    setXIsNext(true);
  }

  const end = calculateEnd({ squares });
  const status = getStatus({ end, xIsNext });

  return (
    <Layout>
      <div className="tictactoe">
        <h2>Tic Tac Toe</h2>
        <div className="board">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)} isX={xIsNext} end={end} />
            <Square value={squares[1]} onSquareClick={() => handleClick(1)} isX={xIsNext} end={end} />
            <Square value={squares[2]} onSquareClick={() => handleClick(2)} isX={xIsNext} end={end} />
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)} isX={xIsNext} end={end} />
            <Square value={squares[4]} onSquareClick={() => handleClick(4)} isX={xIsNext} end={end} />
            <Square value={squares[5]} onSquareClick={() => handleClick(5)} isX={xIsNext} end={end} />
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)} isX={xIsNext} end={end} />
            <Square value={squares[7]} onSquareClick={() => handleClick(7)} isX={xIsNext} end={end} />
            <Square value={squares[8]} onSquareClick={() => handleClick(8)} isX={xIsNext} end={end} />
          </div>
        </div>
        <div className="status">{status}</div>
        <div className="reset">
          {end && (<button onClick={handleReset}>Reset</button>)}
        </div>
      </div>
    </Layout>
  );
}
