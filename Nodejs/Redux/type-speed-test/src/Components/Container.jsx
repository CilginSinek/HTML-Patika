import Header from "./Header";
import TextArea from "./TextArea";
import { useSelector } from "react-redux";
import InputArea from "./InputArea";
import Results from "./Results";

function Container() {
  const isOver = useSelector((state) => state.speed.isOver);

  return (
    <div>
      <Header />
      <TextArea />
      {!isOver ? <InputArea /> : <Results />}
    </div>
  );
}

export default Container;
