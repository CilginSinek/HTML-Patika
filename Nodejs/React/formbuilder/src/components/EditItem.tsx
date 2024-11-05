import { Key, useState } from "react";
import FormType from "../types/FormElement";

interface props {
  formItem: FormType;
}

const EditItem = ({ formItem }: props): JSX.Element => {
  const [newItem, setNewItem] = useState<FormType>(formItem);

  const handleOptionDelete = (arr: any[], index: Key) => {
    const newArr = arr.filter((_, i) => i != index);
    setNewItem({
      ...newItem,
      extentions: { ...newItem.extentions, options: newArr },
    });
  };

  return (
    <div>
      <h1>Edit Item</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignItems: "flex-start",
          padding: "10px",
        }}
      >
        <label htmlFor="header">
          Header:
          <input
            id="header"
            type="text"
            value={newItem.header}
            onChange={(e) => setNewItem({ ...newItem, header: e.target.value })}
          />
        </label>
        {Array.isArray(newItem.extentions.options) &&
          newItem.extentions.options.map(
            (myObj: { [key: string]: any }, i: Key) => {
              return (
                <div key={i} style={{ display: "flex" }}>
                  <label htmlFor={myObj.label}>
                    label:
                    <input type="text" id={myObj.label} />
                  </label>
                  {newItem.type === "Dropdown" && (
                    <label htmlFor="droptext">
                      Text Value:
                      <input type="droptext" name="droptext" id="droptext" />
                    </label>
                  )}
                  <label htmlFor="checkbox">
                    Checked:
                    <input type="checkbox" name="checkbox" id="checkbox" />
                  </label>
                  <label htmlFor="deleteButton">
                    <button
                      onClick={() =>
                        handleOptionDelete(newItem.extentions.options, i)
                      }
                    >
                      Delete
                    </button>
                  </label>
                </div>
              );
            }
          ) && (
            <div>
              <label htmlFor="addOption">
                <button
                  onClick={() =>
                    setNewItem({
                      ...newItem,
                      extentions: {
                        ...newItem.extentions,
                        options: [
                          ...newItem.extentions.options,
                          { label: "New Option", value: "", checked: false },
                        ],
                      },
                    })
                  }
                >
                  Add Option
                </button>
              </label>
            </div>
          )}
      </div>
    </div>
  );
};

export default EditItem;
