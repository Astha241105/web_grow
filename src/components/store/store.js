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
import teamsReducer from "./slices/listofteams";
import createTeamReducer from "./slices/creatingteampart";
import teamRequestReducer from "./slices/joinrequest";
import updateEventReducer from "./slices/updateeventSlice";
import quizCreateReducer from "./slices/create_quiz_Slice";
import notificationsReducer from "./slices/notificationpart";
import joinRequestResponseReducer from "./slices/requestresponse";
import quizReducer from "./slices/quizpart";
import quizStatusReducer from "./slices/quizprogress";
import quizfinalReducer from "./slices/finish";
import quizresultsReducer from "./slices/quizresult2";
import participantsReducer from "./slices/ParticipantList";
import roomsReducer from "./slices/createroomSlice";
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
    updateEvent: updateEventReducer,
    notifications: notificationsReducer,
    joinrequestResponse: joinRequestResponseReducer,
    quizCreate: quizCreateReducer,
    quiz: quizReducer,
    quizStatus: quizStatusReducer,
    quizfinal: quizfinalReducer,
    quizresults: quizresultsReducer,
    participants: participantsReducer,
    rooms: roomsReducer,
  },
});

export default store;
