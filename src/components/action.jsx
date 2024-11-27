// action.js
import { fetchParticipantProfile } from './store/slices/participantprofile';
import { fetchRegisteredEvents } from './store/slices/registeredevent';
import { fetchFavoriteEvents } from './store/slices/favouriteevents';
import { fetchEvents } from './store/slices/listofevents';

export const fetchAllUserData = () => async (dispatch) => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    try {
      await dispatch(fetchEvents())
      await dispatch(fetchParticipantProfile());
      await dispatch(fetchRegisteredEvents());
      await dispatch(fetchFavoriteEvents());
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    console.error("No auth token found in localStorage.");
  }
};
