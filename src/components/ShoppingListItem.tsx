interface ListItemProps {
    value: string,
    checked: boolean,
    onCheckClick: any,
    onDeleteClick: any
}

export default function ShoppingListItem({ value, checked, onCheckClick, onDeleteClick }: ListItemProps) {
    return (
        <li className={ checked ? "list-item list-item-checked" : "list-item" }>
          <a className="list-item__delete-btn" onClick={onDeleteClick}>❌</a>
            {value}
          <a 
            className="list-item__check-btn"
            onClick={onCheckClick}
          >✔</a>
        </li>
    );
}
