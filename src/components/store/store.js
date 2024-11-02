import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import hostReducer from "./slices/hostslice";
import authReducer from "../../features/auth/authSlice";
import passwordResetReducer from "./slices/ForgotPassSlice";
import hostOtpReducer from './slices/hostotp';
import otpReducer from './slices/otpslice';


export const store = configureStore({
  reducer: {
    otp: otpReducer,
    host: hostReducer,
    account: accountReducer,
    auth: authReducer,
    passwordReset: passwordResetReducer,
    hostOtp: hostOtpReducer
  },
});
export default store;
