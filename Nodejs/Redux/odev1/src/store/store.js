import { configureStore } from "@reduxjs/toolkit";

import noteSlice from "./notes/notes.js";

export const store = configureStore({
  reducer: {
    notes: noteSlice,
  },
});
