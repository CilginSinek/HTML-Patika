import { useSelector } from "react-redux";

function Body() {
  const texts = useSelector((state) => state.text.texts);
  return (
    <div>
      {texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}

export default Body;
