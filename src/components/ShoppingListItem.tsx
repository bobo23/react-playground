

interface ListItemProps {
    value: string,
    listKey: number
}

export default function ShoppingListItem({ value, listKey }: ListItemProps) {


    return (
        <div className="list-item" key={listKey} >
          {value}
        </div>
    );
}
