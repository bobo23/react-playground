import { useState } from 'react';

interface ListItemProps {
    value: string,
    onCheckClick: any,
    onDeleteClick: any
}

export default function ShoppingListItem({ value, onCheckClick, onDeleteClick }: ListItemProps) {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    function checkClick() {
        onCheckClick();
        setIsChecked(!isChecked);
    }

    return (
        <li className={ isChecked ? "list-item list-item-checked" : "list-item" }>
          <a className="list-item__delete-btn" onClick={onDeleteClick}>❌</a>
            {value}
          <a 
            className="list-item__check-btn"
            onClick={checkClick}
          >✔</a>
        </li>
    );
}
