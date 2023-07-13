import { configureStore } from "@reduxjs/toolkit";

import basketSlice from "./basketSlice.js";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
  },
});
