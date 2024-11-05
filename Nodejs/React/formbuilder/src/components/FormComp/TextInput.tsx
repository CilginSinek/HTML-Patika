import FormType from "../../types/FormElement";

const TextInput = ({ item }: { item: FormType }) => {
  return (
    <input type={typeDef(item.type)} id={item.id} placeholder={item.header} />
  );
};

const typeDef = (type: string) => {
  switch (type) {
    case "Text":
      return "text";
    case "Number":
      return "number";
    case "Phone":
      return "tel";
    case "Email":
      return "email";
    case "Header Text":
      return "text";
    case "Paragraph":
      return "text";
    case "Date":
      return "date";
    default:
      return "text";
  }
};

export default TextInput;