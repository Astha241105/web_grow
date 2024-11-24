import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import hostReducer from "./slices/hostslice";
import authReducer from "./slices/authSlice";
import passwordResetReducer from "./slices/ForgotPassSlice";
import hostOtpReducer from "./slices/hostotp";
import otpReducer from "./slices/otpslice";
import fpotpReducer from "./slices/fpotpslice";
import fpchangeReducer from "./slices/fpchangeslice";
import eventsReducer from "./slices/listofevents"

export const store = configureStore({
  reducer: {
    account: accountReducer,
    host: hostReducer,
    auth: authReducer,
    passwordReset: passwordResetReducer,
    hostOtp: hostOtpReducer,
    otp: otpReducer,
    fpotp: fpotpReducer,
    fpchange: fpchangeReducer,
    events: eventsReducer,
  },
});

export default store;
