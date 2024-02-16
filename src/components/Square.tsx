import { useState } from 'react';

interface ButtonProps {
    value: string,
    onSquareClick: any,
    isX: boolean,
    end: null|string
}

export default function Square({ value, onSquareClick, isX, end }: ButtonProps) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const buttonStyle = {
    color: isHovering && !value ? 'grey' : 'black',
    backgroundColor: getBackgroundValue(),
    fontWeight: value && '700'
  }

  function getValue() {
    if (value) {
        return value;
    }
    if (!end && isHovering) {
        return isX ? 'X' : 'O';
    }

    return '';
  }

  function getBackgroundValue() {
    if (value && value === 'O') {
        return '#db6360';
    }
    if (value && value === 'X') {
        return '#72cc7b';
    }
    if (!end && isHovering && !value && !isX) {
        return '#e8cac3';
    }
    if (!end && isHovering && !value && isX) {
        return '#d5f0db';
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
      {getValue()}
    </button>
  );
}