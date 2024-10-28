import React, { useState } from 'react';
import FormType from '../types/FormElement';

interface DraggableListProps {
  FormObjs: FormType[];
  dragedItem: any|null;
  setDragedItem: Function;
}


const DraggableList = ({FormObjs, dragedItem, setDragedItem}:DraggableListProps):JSX.Element => {
  const [items, setItems] = useState<FormType[]>(FormObjs);

  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(null);

  // Handles the start of the drag
  const handleDragStart = (index: number) => {
    setDraggingItemIndex(index);
  };

  // Handles the item being dragged over another item
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault(); // Prevent default to allow dropping
    const newList = [...items];
    const draggedItem = newList[draggingItemIndex!];

    // Remove the dragged item from its original position
    newList.splice(draggingItemIndex!, 1);

    // Insert the dragged item into its new position
    newList.splice(index, 0, draggedItem);

    setItems(newList);
    setDraggingItemIndex(index); // Update the new index for dragging
  };

  // Handles the drop event
  const handleDrop = () => {
    setDraggingItemIndex(null); // Clear the dragging state
  };

  const onDragEnd = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();

    if (dragedItem) {
      console.log("sex")
      if (!items.some((item) => item.id === dragedItem.id)) {
        setItems([
          ...items,
          {
            id: dragedItem.id,
            type: dragedItem.type,
            extentions: dragedItem.extentions
              ? dragedItem.extentions
              : {},
            header: dragedItem.header,
          },
        ]);
        setDragedItem(null);
      }
    }
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0, color:"black", width:"20em", background:"blue", border:"dashed 0.4em", height:"50em" }} onDragLeaveCapture={onDragEnd}>
      {items.map((item, index) => (
        <li
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={handleDrop}
          style={{
            padding: '16px',
            marginBottom: '8px',
            backgroundColor: draggingItemIndex === index ? '#d3d3d3' : '#f0f0f0',
            borderRadius: '4px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
            cursor: 'move',
            userSelect: 'none',
            display:"flex",
            flexDirection:"row",
            alignContent:"center",
            justifyContent:"space-between",
            alignItems:"center"
          }}
        >
          <p>
          {item.type}            
          </p>
          <button>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DraggableList;
