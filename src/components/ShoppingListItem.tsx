

interface ListItemProps {
    value: string,
    onCheckClick: any,
    onDeleteClick: any
}

export default function ShoppingListItem({ value, onCheckClick, onDeleteClick }: ListItemProps) {

    return (
        <li className="list-item">
          <a className="list-item__delete-btn" onClick={onDeleteClick}>❌</a>
            {value}
          <a className="list-item__check-btn" onClick={onCheckClick}>✔</a>
        </li>
    );
}
