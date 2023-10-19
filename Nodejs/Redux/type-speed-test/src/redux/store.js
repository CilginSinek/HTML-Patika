import { configureStore } from "@reduxjs/toolkit";

import speedSlice from "./speedSlice/speedSlice";

export const store = configureStore({
  reducer: {
    speed: speedSlice,
  },
});
