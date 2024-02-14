import { useState, ChangeEvent, FormEvent } from 'react';

export default function ShoppingList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Verhindere das Neuladen der Seite

    if (!inputValue.trim()) return;

    setItems([...items, inputValue]);
    setInputValue('');
    console.log(items);
  };

  return(
    <>
      <div className='shopping-list'>
        <h2>Shopping List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
      </div>
    </>
  );
}