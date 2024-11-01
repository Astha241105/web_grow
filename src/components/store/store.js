import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import otpReducer from "./slices/otpslice";
import authReducer from "../../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    account: accountReducer,
    otp: otpReducer,
    auth: authReducer,
  },
});
