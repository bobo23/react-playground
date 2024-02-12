import { useState } from 'react';

interface ButtonValue {
    value: string,
    onSquareClick: any,
    isX: boolean
}

export default function Square({ value, onSquareClick, isX }: ButtonValue) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const buttonStyle = {
    color: isHovering && !value ? 'grey' : 'black'
  }

  function setValue() {
    if (value) {
        return value;
    }
    if (isHovering) {
        return isX ? 'X' : 'O';
    }

    return '';
  }

  return (
    <button
      className="square"
      onClick={onSquareClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={buttonStyle}
    >
      {setValue()}
    </button>
  );
}