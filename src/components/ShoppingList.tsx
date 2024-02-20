import { useState, ChangeEvent, FormEvent, DragEvent } from 'react';
import ShoppingListItem from './ShoppingListItem';

interface Items {
  value: string;
  isChecked: boolean;
}

export default function ShoppingList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Items[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverItemIndex, setDragOverItemIndex] = useState<number | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

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

  const handleDragStart = (index: number): void => {
    setDraggedItemIndex(index);
  };
  
  const handleDragOver = (event: DragEvent<HTMLLIElement>, index: number): void => {
    event.preventDefault();
    setDragOverItemIndex(index);
  };

  const handleDrop = (): void => {
    if (draggedItemIndex === null || dragOverItemIndex === null) return;
  
    const itemsCopy = [...items];
    const draggedItem = itemsCopy[draggedItemIndex];
    itemsCopy.splice(draggedItemIndex, 1); // Entferne das gezogene Element
    itemsCopy.splice(dragOverItemIndex, 0, draggedItem); // Füge es an der neuen Position ein
  
    setItems(itemsCopy);
    setDraggedItemIndex(null); // Reset
    setDragOverItemIndex(null); // Reset
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
            <span>+</span>
          </button>
        </form>
        <ul className="list" onDrop={handleDrop}>
          {items.map((item, index) => (
            <ShoppingListItem
              key={index}
              value={item.value}
              isChecked={item.isChecked}
              onCheckClick={() => handleCheckClick(index)}
              onDeleteClick={() => handleDeleteClick(index)}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event: DragEvent<HTMLLIElement>) => handleDragOver(event, index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}