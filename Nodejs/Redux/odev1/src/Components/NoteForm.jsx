/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewNoteAsync } from "../store/notes/service";

function NoteForm() {
  const [noteText, setNoteText] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const dispatch = useDispatch();

  //Hazir renk kodlarim
  const colors = ["color-1", "color-2", "color-3", "color-4"];


  //submit edildiginde yeni notu backende ve redux notesa yazip inputlari temizliyor
  const HandleSubmit = async () => {
    if (radioValue === "" || noteText ==="") return null;
    const newNote = {
      noteText: noteText,
      color: radioValue,
      createAt: new Date(),
    };
    dispatch(addNewNoteAsync(newNote));
    setNoteText("");
    setRadioValue("");
  };

  return (
    <div className="NoteForm">
      <div>
        <textarea
          className="formArea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a new note..."
        ></textarea>
      </div>
      <div className="formbuttons">
        <div className="custom-radios">
          {colors.map((color, index) => (
            <Radio
              key={index}
              value={color}
              setRadioValue={setRadioValue}
              radioValue={radioValue}
            />
          ))}
        </div>
        <div>
          <button onClick={HandleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}

function Radio({ value, setRadioValue, radioValue }) {

  //secilen renk kodunu ust componente gpnderiyor
  const onChangeRadio = (e) => {
    setRadioValue(e.target.value);
  };
  
  return (
    <div>
      <input
        type="radio"
        id={value}
        name="color"
        value={value}
        onChange={onChangeRadio}
        checked={value === radioValue}
      />
      <label htmlFor={value}>
        <span>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
            alt="Checked Icon"
          />
        </span>
      </label>
    </div>
  );
}

export default NoteForm;
