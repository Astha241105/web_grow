import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./slices/create_event_Slice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;
