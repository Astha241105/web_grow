import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import authReducer from "../../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },

  reducer: {
    auth: authReducer,
  },
});
