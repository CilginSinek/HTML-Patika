import { Key } from "react";
import FormType from "../../types/FormElement";

const DropDown = ({ item }: { item: FormType }) => {
  return (
    <div>
      <select>
        {item.extentions.options.map(
          (
            option: { label: string; value: string; checked: boolean },
            index: Key
          ) => (
            <option
              key={index}
              value={option.value}
              defaultChecked={option.checked}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default DropDown;
