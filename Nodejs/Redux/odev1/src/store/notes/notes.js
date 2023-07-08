/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import {
  deleteNoteAsync,
  getNotesAsync,
  editNoteAsync,
  addNewNoteAsync,
} from "./service";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    filterText: "",
    isLoading: false,
    isErr: null,
  },
  reducers: {
    //sync fonksiyonumu reducerde yaziyorum
    getFilter: (state, action) => {
      state.filterText = action.payload;
    },
  },
  extraReducers: {
    //async fonksiyonlarimi extrareducersde yaziyorum

    //getNotes
    [getNotesAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getNotesAsync.fulfilled]: (state, action) => {
      state.notes = action.payload;
      state.isLoading = false;
    },
    [getNotesAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.isErr = action.error.message;
    },

    //AddNote
    [addNewNoteAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addNewNoteAsync.fulfilled]: (state, action) => {
      state.notes.push(action.payload);
      state.isLoading = false;
    },
    [addNewNoteAsync.rejected]: (state, action) => {
      state.isErr = action.error.message;
      state.isLoading = false;
    },

    //EditNote
    [editNoteAsync.fulfilled]: (state, action) => {
      const { note, id } = action.payload;
      const index = state.notes.findIndex((item) => item.id === id);
      console.log("editIndex:",index)
      state.notes[index].noteText = note;
    },

    //DeleteNote
    [deleteNoteAsync.fulfilled]: (state, action) => {
      const id  = action.payload;
      const index = state.notes.findIndex((item) => item.id === id);
      console.log("deleteIndex", index);
      state.notes.splice(index, 1);
    },
  },
});

export const { getFilter } = noteSlice.actions;
export default noteSlice.reducer;
