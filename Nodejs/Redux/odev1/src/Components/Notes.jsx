import { useEffect, useState } from "react";
import Note from "./Note";
import { useSelector, useDispatch } from "react-redux";
import { getNotesAsync } from "../store/notes/service";



function Notes() {
  //notlarimi filtremi loading ve err bilgimi reduxtan aliyorum
  const notes = useSelector((state) => state.notes.notes);
  const filterText = useSelector((state) => state.notes.filterText);
  const isLoading = useSelector((state)=>state.notes.isLoading);
  const err = useSelector((state)=>state.notes.isErr);
  const dispatch = useDispatch()

  //componente ozel bir array aciyorum daha kolay veri manipule etmek icin
  const [thisNote, setThisNote] = useState([]);

  //component mount edildiginde notelarimi backendden getirip storedaki notes e yazmasini sagliyorum
  useEffect(()=>{
    dispatch(getNotesAsync())
  },[dispatch])

  //notes ya da filtre degistiginde ozel array guncellenmesini sagliyorum(arama yapildiginde anlik degisim sagliyor)
  useEffect(()=>{
    if(notes.length && filterText.length){
        setThisNote([...notes.filter((note)=>note.noteText.includes(filterText))])
    }else if(!filterText.length){
        setThisNote(notes)
    }
  },[notes,filterText])

  if(isLoading)return<div>loading...</div>
  if(err)return <div>{err}</div>

  return (
    <div className="CardBox">
      {thisNote !== 0 && thisNote.map((item, index) => (
        <Note key={index} note={item} />
      ))}
    </div>
  );
}

export default Notes;
