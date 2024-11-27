import { createSlice } from "@reduxjs/toolkit";
const uploadImage = (file) => {
  return async (dispatch) => {
    dispatch(eventsSlice.actions.setLoading(true));
    try {
      const formData = new FormData();
      formData.append("keyName", file.name);
      formData.append("Logo", file);

      const response = await fetch("http://www.arthkambhoj.me:8080/s3/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      dispatch(eventsSlice.actions.setImageUrl(data.imageUrl));
      return data.imageUrl;
    } catch (error) {
      dispatch(eventsSlice.actions.setError(error.message));
      throw error;
    } finally {
      dispatch(eventsSlice.actions.setLoading(false));
    }
  };
};

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    imageUrl: null,
    opportunityType: "",
    visibility: "",
    opportunityTitle: "",
    organization: "",
    websiteUrl: "",
    festival: "",
    eventMode: "",
    category: "",
    skills: "",
    aboutOpportunity: "",

    participationType: "",
    minTeamSize: "",
    maxTeamSize: "",
    registrationStartDate: "",
    registrationStartTime: "",
    registrationEndDate: "",
    registrationEndTime: "",
    maxRegistrations: "",

    hasHost: null,

    loading: false,
    error: null,
  },
  reducers: {
    setBasicDetails: (state, action) => {
      return { ...state, ...action.payload };
    },

    setRegistrationDetails: (state, action) => {
      return { ...state, ...action.payload };
    },

    setHostStatus: (state, action) => {
      state.hasHost = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetState: (state) => {
      Object.keys(state).forEach((key) => {
        state[key] = eventsSlice.initialState[key];
      });
    },
  },
});

const createEvent = (eventData) => {
  return async (dispatch) => {
    dispatch(eventsSlice.actions.setLoading(true));
    try {
      const response = await fetch(
        "http://www.arthkambhoj.me:8080/api/events/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Event creation failed");
      }

      const data = await response.json();
      dispatch(eventsSlice.actions.resetState());
      return data;
    } catch (error) {
      dispatch(eventsSlice.actions.setError(error.message));
      throw error;
    } finally {
      dispatch(eventsSlice.actions.setLoading(false));
    }
  };
};

export const {
  setBasicDetails,
  setRegistrationDetails,
  setHostStatus,
  setImageUrl,
  setError,
  resetState,
} = eventsSlice.actions;

export { uploadImage, createEvent };
export default eventsSlice.reducer;
