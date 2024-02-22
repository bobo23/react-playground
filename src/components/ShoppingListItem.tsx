interface ListItemProps {
  value: string;
  isChecked: boolean;
  onCheckClick: () => void;
  onDeleteClick: () => void;
}

export default function ShoppingListItem({ 
  value,
  isChecked,
  onCheckClick,
  onDeleteClick,
}: ListItemProps) {
  return (
    <li 
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
