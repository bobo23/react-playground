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
    <div className="shopping-list">
      <h2>Shopping List</h2>
      <div className="list-container">
        <form className="list-submission" onSubmit={handleSubmit}>
          <input
            className="list-submission__input"
            type="text"
            value={inputValue}
            placeholder="Produkt hinzufügen..."
            onChange={handleChange}
          />
          <button className="list-submission__btn" type="submit">
            <span>Add</span>
          </button>
        </form>
        <ul className="list">
          {items.map((item, index) => (
            <ShoppingListItem key={index} value={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}