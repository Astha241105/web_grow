// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
