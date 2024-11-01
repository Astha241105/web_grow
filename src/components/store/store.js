import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import otpReducer from "./slices/otpslice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    otp: otpReducer,
  },
});
