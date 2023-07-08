/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteNoteAsync, editNoteAsync } from "../store/notes/service";

function Note({ note }) {
  const [noteText, setNoteText] = useState(note?.noteText);
  const [editMod, setEditMod] = useState(false);
  const dispatch = useDispatch();

  //Submit ettigimde edit moddan cikip backendde put yapiyor ve reduxtaki notes listemdeki notu duzenliyor
  const HandleEditSubmit = (event) => {
    if (event.keyCode === 13) {
      const editedNote = { ...note, noteText: noteText };
      dispatch(editNoteAsync({ note: editedNote, id: note.id }));
      setEditMod(false);
    }
  };

  //backendden elementi siliyor ve reduxtaki notesdaki notu siliyor
  const HandleDelete = () => {
    dispatch(deleteNoteAsync(note.id));
  };

  return (
    <div className={`noteCard ${note.color}`}>
      {!editMod ? (
        <div className="noteText" onDoubleClick={() => setEditMod(true)}>
          {noteText}
        </div>
      ) : (
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={HandleEditSubmit}
        ></textarea>
      )}
      <div className="noteInfo">
        <button className="delete" onClick={HandleDelete}>X</button>
        <small>{note.createAt}</small>
      </div>
    </div>
  );
}

export default Note;
