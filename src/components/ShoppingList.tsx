import { useState, ChangeEvent, FormEvent } from 'react';
import ShoppingListItem from './ShoppingListItem';

interface Items {
  value: string;
  isChecked: boolean;
}

export default function ShoppingList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Items[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Verhindere das Neuladen der Seite

    if (!inputValue.trim()) return;

    setItems([...items, { value: inputValue.trim(), isChecked: false } as Items]);
    setInputValue('');
  };

  const handleCheckClick = (index: number): void => {
    const copy = items.slice();

    copy[index].isChecked = !copy[index].isChecked;
  
    const uncheckedItems = copy.filter(item => !item.isChecked);
    const checkedItems = copy.filter(item => item.isChecked);

    setItems([...uncheckedItems, ...checkedItems]);
  }

  const handleDeleteClick = (index: number): void => {
    const copy = items.slice();

    copy.splice(index, 1);
    setItems(copy);
  }

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
            <span>+</span>
          </button>
        </form>
        <ul className="list">
          {items.map((item, index) => (
            <ShoppingListItem
              key={index}
              value={item.value}
              isChecked={item.isChecked}
              onCheckClick={() => handleCheckClick(index)}
              onDeleteClick={() => handleDeleteClick(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}