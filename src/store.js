import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducers/dataSlice";

const store = configureStore({
  reducer: {
    teamsData: dataSlice,
  },
});

export default store;
