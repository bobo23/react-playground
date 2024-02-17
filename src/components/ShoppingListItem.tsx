

interface ListItemProps {
    value: string
}

export default function ShoppingListItem({ value }: ListItemProps) {

    return (
        <li className="list-item">
          <a className="list-item__delete-btn">❌</a>
            {value}
          <a className="list-item__check-btn">✔</a>
        </li>
    );
}
