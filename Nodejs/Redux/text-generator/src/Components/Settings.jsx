import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setTextLength,
  setType,
} from "../redux/textSlice/textSlice";
import { useEffect } from "react";
import { getAsyncText } from "../redux/textSlice/service";

function Settings() {
  const textLength = useSelector((state) => state.text.textLength);
  const status = useSelector((state) => state.text.status);
  const html = useSelector((state) => state.text.Html);
  // console.log(html)
  const dispatch = useDispatch();

  const HandleChangeInput = (e) => {
    if (e.target.value !== "") {
      dispatch(setTextLength(parseInt(e.target.value)));
      dispatch(setStatus("idle"));
    }
  };

  const HandleChangeSelect = (e) => {
    dispatch(setType(e.target.value === 'true'));
    dispatch(setStatus("idle"));
  };

  useEffect(() => {
    if (status === "idle" && textLength > 0) {
      dispatch(getAsyncText({ param: textLength, type: html }));
    }
  }, [dispatch, textLength, status, html]);

  return (
    <div>
      <div>
        <label htmlFor="paragraphs">Paragraphs</label>
        <input
          onChange={HandleChangeInput}
          value={textLength}
          type="number"
          min="0"
          name="paragraphs"
          disabled={status === "Loading"}
        />
      </div>
      <div>
        <label htmlFor="html">Include HTML</label>
        <select value={html} onChange={HandleChangeSelect} name="html">
          <option value={true}>yes</option>
          <option value={false}>no</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
