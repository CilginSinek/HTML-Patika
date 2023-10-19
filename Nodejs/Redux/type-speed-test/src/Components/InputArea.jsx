import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goNextWord,
  setIsCorret,
  startTest,
} from "../redux/speedSlice/speedSlice";
import Timer from "./Timer";

function InputArea() {
  const dispatch = useDispatch();
  const isStart = useSelector((state) => state.speed.isStart);
  const nWord = useSelector((state) => state.speed.onText);
  const Language = useSelector((state) => state.speed.language);

  const [stateWord, setStateWord] = useState(nWord);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    setStateWord(nWord);
  }, [dispatch, isStart, nWord]);

  const spaceKeyDown = (e) => {
    if (isStart === false) {
      dispatch(startTest());
    }
    if (e.key === " ") {
      dispatch(goNextWord({ stateWord, text: inputText }));
      setInputText("");
    }
    dispatch(
      setIsCorret(stateWord[Language].slice(0, inputText.length) === inputText)
    );
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value.trim());
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={spaceKeyDown}
      />
      <Timer />
    </div>
  );
}

export default InputArea;
