import FormType from "../types/FormElement";
import DropDown from "./FormComp/DropDown";
import TextInput from "./FormComp/TextInput";

const PrevForm = ({ items }: { items: FormType[] }): JSX.Element => {
  return (
    <div>
      {items.map((item: FormType, index: number) => {
        switch (item.type) {
          case "Dropdown":
          case "Radio":
          case "Checkbox":
          case "Multiselect":
            return <DropDown key={index} item={item} />;
          case "Text":
          case "Number":
          case "Phone":
          case "Email":
          case "Header Text":
          case "Paragraph":
          case "Date":
            return <TextInput key={index} item={item} />;

          default:
            return <div key={index}>Invalid Form Type</div>;
        }
      })}
    </div>
  );
};

export default PrevForm;
