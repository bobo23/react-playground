import { useState, ChangeEvent, FormEvent } from 'react';
import ShoppingListItem from './ShoppingListItem';

export default function ShoppingList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Verhindere das Neuladen der Seite

    if (!inputValue.trim()) return;

    setItems([...items, inputValue.trim()]);
    setInputValue('');
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
        <div>
          {items.map((item, index) => (
            <ShoppingListItem value={item} listKey={index} />
          ))}
        </div>
      </div>
    </>
  );
}