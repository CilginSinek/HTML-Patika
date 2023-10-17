/* eslint-disable no-undef */
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//post get methodlarinin uygulanacagi endpoint: localhost/notes
const baseUrl = ""

//not getirici
export const getNotesAsync = createAsyncThunk("notes/getNotesAsync", async () => {
  const res = await axios(baseUrl);
  return res.data;
});

//not ekleyici
export const addNewNoteAsync = createAsyncThunk("notes/addNewNoteAsync", async (note) => {
    const res = await axios.post(baseUrl,note);
    return res.data;
});

//not duzenleyici
export const editNoteAsync = createAsyncThunk("notes/editNoteAsync", async ({note, id}) => {
    const res = await axios.patch(`${baseUrl}/${id}`,note);
    return res.data;
});

//not silici
export const deleteNoteAsync = createAsyncThunk("notes/deleteNoteAsync", async (id)=>{
    await axios.delete(`${baseUrl}/${id}`);
    return id
})
  
