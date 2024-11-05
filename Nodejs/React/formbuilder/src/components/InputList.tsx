import inputArr from "../assets/inputTypes.json";


const InputList = (): JSX.Element => {

  const onDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    const extentions = JSON.parse(e.currentTarget.getAttribute("data-extention") as string)
    const data = {type:extentions.type, id:generateId(), extentions:extentions, header:extentions.type};
    localStorage.setItem("dragData", JSON.stringify(data));
  };

  return (
    <div>
      <ul>
        {inputArr.map((input: string, index: number) => (
          <li
            draggable={true}
            key={index}
            data-extention={JSON.stringify(createExtention(input))}
            onDrag={onDragEnd}
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
const createExtention = (input: string) => {
  switch (input) {
    case "Dropdown":
    case "Radio":
    case "Checkbox":
    case "Multiselect":
      return {
        type: input,
        options: [
          { label: "Option 1", value: "", checked: false },
          { label: "Option 2", value: "", checked: false },
          { label: "Option 3", value: "", checked: false },
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
export default InputList;
