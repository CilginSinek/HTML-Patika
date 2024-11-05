import React, { useState } from "react";
import FormType from "../types/FormElement";

interface DraggableListProps {
  FormObjs: FormType[];
  setFormObjs: Function;
  setEditItem: Function;
  setSee: Function;
}

const DraggableList = ({
  FormObjs,
  setFormObjs,
  setEditItem,
  setSee,
}: DraggableListProps): JSX.Element => {
  const [draggingItemIndex, setDraggingItemIndex] = useState<number | null>(
    null
  );

  // Handles the start of the drag
  const handleDragStart = (index: number) => {
    try {
      setDraggingItemIndex(index);
    } catch (e) {
      console.log(e);
    }
  };

  // Handles the item being dragged over another item
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault(); // Prevent default to allow dropping
    try {
      if (draggingItemIndex === null) return;
      const newList = [...FormObjs];
      const draggedItem = newList[draggingItemIndex!];

      // Remove the dragged item from its original position
      newList.splice(draggingItemIndex!, 1);

      // Insert the dragged item into its new position
      newList.splice(index, 0, draggedItem);

      setFormObjs(newList);
      setDraggingItemIndex(index); // Update the new index for dragging
    } catch (e) {
      console.log(e);
    }
  };

  // Handles the drop event
  const handleDrop = () => {
    try {
      setDraggingItemIndex(null); // Clear the dragging state
    } catch (e) {
      console.log(e);
    }
  };

  const onDragEnd = (event: React.DragEvent<HTMLUListElement>) => {
    event.preventDefault();
    const dragedItem = JSON.parse(localStorage.getItem("dragData")!);

    try {
      if (dragedItem) {
        console.log(dragedItem);
        if (!FormObjs.some((item) => item.id === dragedItem.id)) {
          setFormObjs([
            ...FormObjs,
            {
              id: dragedItem.id,
              type: dragedItem.type,
              extentions: dragedItem.extentions ? dragedItem.extentions : {},
              header: dragedItem.header,
            },
          ]);
          localStorage.removeItem("dragData");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteEvent = (id: string): void => {
    try {
      setFormObjs((e: FormType[]) => e.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={() => setSee((e: boolean) => e!)}> Prev Form </button>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          color: "black",
          width: "20em",
          background: "blue",
          border: "dashed 0.4em",
          height: "50em",
          overflowY: "scroll",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDropCapture={onDragEnd}
      >
        {FormObjs.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={handleDrop}
            style={{
              padding: "20px",
              marginBottom: "8px",
              backgroundColor:
                draggingItemIndex === index ? "#d3d3d3" : "#f0f0f0",
              borderRadius: "4px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
              cursor: "move",
              userSelect: "none",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item.type}
            <div style={{ gap: "10px", display: "flex", flexDirection: "row" }}>
              <button onClick={() => setEditItem(item)}>Edit</button>
              <button onClick={() => onDeleteEvent(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableList;
