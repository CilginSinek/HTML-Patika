import { createSlice } from "@reduxjs/toolkit";
import out from "./example";

export const textSlice = createSlice({
  name: "text",
  initialState: {
    text: "",
    exampleText: out,
  },
  reducers: {
    changeText: (state, action) => {
      state.text = action.payload;
    },
    getExample: (state) => {
      state.text = state.exampleText;
    },
  },
});
export const { changeText, getExample } = textSlice.actions;
export default textSlice.reducer;
