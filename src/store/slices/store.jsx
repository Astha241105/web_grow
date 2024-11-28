import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/create_event_Slice";
import eventmanageReducer from "./slices/eventmanageSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventmanage: eventmanageReducer,
  },
});

export default store;
