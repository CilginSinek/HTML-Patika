import inputArr from "../assets/inputTypes.json";

interface props {
  setDragedItem: Function;
}

const InputList = ({setDragedItem}:props): JSX.Element => {
  const createExtention = (input: string) => {
    switch (input) {
      case "Dropdown":
      case "Radio":
      case "Checkbox":
      case "Multiselect":
        return {
          type: input,
          options: [
            { label: "Option 1", value: "Option 1", checked: false },
            { label: "Option 2", value: "Option 2", checked: false },
            { label: "Option 3", value: "Option 3", checked: false },
          ],
        };
      case "Text":
      case "Number":
      case "Phone":
      case "Email":
      case "Header Text":
      case "Paragraph":
      case "Date":
        return {
          type: input,
          placeholder: "Placeholder",
          value: "",
          maxLength:null,
          minLength:null,
        }
      default:
        return{
          type: input,
          value: "",
        }
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const extentions = JSON.parse(e.currentTarget.getAttribute("data-extention") as string)
    const data = {type:extentions.type, id:generateId(), extentions:extentions, header:extentions.type};
    setDragedItem(data);
    console.log(data)
  };
  return (
    <div>
      <ul>
        {inputArr.map((input: string, index: number) => (
          <li
            draggable={true}
            key={index}
            data-extention={JSON.stringify(createExtention(input))}
            onDragEndCapture={onDragEnd}
          >
            {input}
          </li>
        ))}
      </ul>
    </div>
  );
};

const generateId = ():string=>{
  return Math.random().toString(36).substring(7);
}

export default InputList;
