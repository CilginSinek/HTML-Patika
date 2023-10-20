import { configureStore } from "@reduxjs/toolkit";

import rockSlice from "./rockSlice/rockSlice";

export const store = configureStore({
  reducer: {
    rock: rockSlice,
  },
});
