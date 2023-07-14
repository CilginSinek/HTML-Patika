/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { getAsyncText } from "./service";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    texts: [],
    textLength: 4,
    Html: false,
    status: "idle",
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTextLength: (state, action) => {
      state.textLength = action.payload;
    },
    setType: (state, action) => {
      state.Html = action.payload;
    },
  },
  extraReducers: {
    [getAsyncText.pending]: (state, action) => {
      state.status = "Loading";
    },
    [getAsyncText.fulfilled]: (state, action) => {
      state.status = "Success";
      console.log(action.payload)
      state.texts = action.payload;
    },
    [getAsyncText.rejected]: (state, action) => {
      state.status = "Error";
      state.texts = action.error.message;
    },
  },
});

export const { setStatus, setTextLength, setType } = textSlice.actions;
export default textSlice.reducer;
