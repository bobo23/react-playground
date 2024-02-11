interface ButtonValue {
    value: string,
    onSquareClick: any
}

export default function Square({ value, onSquareClick }: ButtonValue) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}