

interface ListItemProps {
    value: string
}

export default function ShoppingListItem({ value }: ListItemProps) {

    return (
        <li>
          {value}
        </li>
    );
}
