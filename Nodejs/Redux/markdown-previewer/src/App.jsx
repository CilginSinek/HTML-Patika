import TextArea from "./components/TextArea";
import MarkDownArea from "./components/MarkDownArea";
import "./App.css";
import { useDispatch } from "react-redux";
import { getExample } from "./redux/textSlice/textSlice";

function App() {
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="header">
        <h1>Markdown Previewer</h1>
        <button onClick={() => dispatch(getExample())} className="changeButton">
          ?
        </button>
      </div>
      <div className="area">
        <TextArea />
        <MarkDownArea />
      </div>
    </div>
  );
}

export default App;
