import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeText } from "../redux/textSlice/textSlice";

function TextArea() {
  const dispathedText = useSelector((state) => state.text.text);
  const dispatch = useDispatch();
  const [text, setText] = useState(dispathedText);

  useEffect(() => {
    dispatch(changeText(text));
  }, [dispatch, text]);

  return (
    <div className="card">
      <textarea
        value={dispathedText}
        onChange={(e) => setText(e.target.value)}
        name="textarea"
        id="textarea"
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
}

export default TextArea;
