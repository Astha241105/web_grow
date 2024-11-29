import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountslice";
import hostReducer from "./slices/hostslice";
import authReducer from "./slices/authSlice";
import passwordResetReducer from "./slices/ForgotPassSlice";
import hostOtpReducer from "./slices/hostotp";
import otpReducer from "./slices/otpslice";
import fpotpReducer from "./slices/fpotpslice";
import fpchangeReducer from "./slices/fpchangeslice";
import createEventReducer from "./slices/create_event_Slice";
import eventmanageReducer from "./slices/eventmanageSlice";

import registeredEventsReducer from "./slices/registeredevent";
import participantReducer from "./slices/participantprofile";
import eventsReducer from "./slices/listofevents";
import eventDetailsReducer from "./slices/eventdetails";
import eventRegistrationReducer from "./slices/registerforevent";
import favoritesReducer from "./slices/favouriteevents";
import addToFavoritesReducer from "./slices/addfavourite";
import teamsReducer from './slices/listofteams';
import createTeamReducer from './slices/creatingteampart';
import teamRequestReducer from './slices/joinrequest';

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
    registeredEvents: registeredEventsReducer,
    participant: participantReducer,
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    eventRegistration: eventRegistrationReducer,
    favorites: favoritesReducer,
    addToFavorites: addToFavoritesReducer,
    createEvent: createEventReducer,
    eventmanage: eventmanageReducer,
    teams: teamsReducer, 
    createTeam: createTeamReducer,
    teamRequest: teamRequestReducer,
  },
});

export default store;
