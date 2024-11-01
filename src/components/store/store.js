import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import otpReducer from "./slices/otpslice";
import authReducer from "../../features/auth/authSlice";
import passwordResetReducer from "./slices/ForgotPassSlice";


export const store = configureStore({
  reducer: {
    account: accountReducer,
    auth: authReducer,
    passwordReset: passwordResetReducer,
  },
});
