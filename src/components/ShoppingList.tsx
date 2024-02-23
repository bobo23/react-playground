import { useState, ChangeEvent, FormEvent } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import ShoppingListItem from './ShoppingListItem';

interface Items {
  itemId: string;
  value: string;
  isChecked: boolean;
}

export default function ShoppingList() {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<Items[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    setItems([...items, { itemId: `id-${new Date().getTime()}`, value: inputValue.trim(), isChecked: false } as Items]);
    setInputValue('');
  };

  const handleCheckClick = (index: number): void => {
    const copy = [...items];

    copy[index].isChecked = !copy[index].isChecked;
  
    const sortedItems = sortItems(copy);

    setItems(sortedItems);
  }

  const handleDeleteClick = (index: number): void => {
    const copy = [...items];

    copy.splice(index, 1);
    setItems(copy);
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    const itemsCopy = [...items];
    const sourceItem = itemsCopy[source.index];
    console.log(sourceItem.itemId, sourceItem.value, sourceItem.isChecked);
    // Logik, um zu verhindern, dass Items zwischen bestimmten Bereichen bewegt werden
    // Zum Beispiel, indem du prüfst, ob das Ziel ein Bereich für gecheckte Items ist und das gezogene Item ungecheckt ist
    if (sourceItem.isChecked) {
      // Implementiere Logik, wenn nötig
    }
  
    itemsCopy.splice(source.index, 1);
    itemsCopy.splice(destination.index, 0, sourceItem);
  
    setItems(itemsCopy);
  };

  const sortItems = (items: Items[]) => {
    const uncheckedItems = items.filter(item => !item.isChecked);
    const checkedItems = items.filter(item => item.isChecked);

    return [...uncheckedItems, ...checkedItems];
  }

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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-shopping-list">
            {(provided) => (
              <ul className="list" {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable key={item.itemId} draggableId={item.itemId} index={index} isDragDisabled={item.isChecked}>
                    {(provided) => (
                      <ShoppingListItem
                        key={index}
                        value={item.value}
                        isChecked={item.isChecked}
                        onCheckClick={() => handleCheckClick(index)}
                        onDeleteClick={() => handleDeleteClick(index)}
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}