import { DragEvent } from 'react';

interface ListItemProps {
  value: string;
  isChecked: boolean;
  onCheckClick: () => void;
  onDeleteClick: () => void;
  onDragStart: () => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
}

export default function ShoppingListItem({ 
  value,
  isChecked,
  onCheckClick,
  onDeleteClick,
  onDragStart,
  onDragOver 
}: ListItemProps) {
  return (
    <li 
      className={ isChecked ? "list-item list-item-checked" : "list-item" }
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
    >
      <a className="list-item__delete-btn" onClick={onDeleteClick}>❌</a>
        {value}
      <a 
        className="list-item__check-btn"
        onClick={onCheckClick}
      >✔</a>
    </li>
  );
}
