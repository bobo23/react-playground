import { DraggableProvided } from 'react-beautiful-dnd';

interface ListItemProps {
  value: string;
  isChecked: boolean;
  onCheckClick: () => void;
  onDeleteClick: () => void;
  provided: DraggableProvided;
}

export default function ShoppingListItem({ 
  value,
  isChecked,
  onCheckClick,
  onDeleteClick,
  provided
}: ListItemProps) {
  return (
    <li
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className={ isChecked ? "list-item list-item-checked" : "list-item" }
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
