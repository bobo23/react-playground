import { useState } from 'react';

export default function Square() {
  const [buttonValue, setButtonValue] = useState('');

  function handleClick() {
    setButtonValue('X');
  }

  return (
    <button 
      className="square"
      onClick={handleClick}
    >
      {buttonValue}
    </button>
  );
}