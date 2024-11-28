import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const uploadImage = createAsyncThunk(
  "events/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("keyName", file.name);
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await fetch("http://www.arthkambhoj.me:8080/s3/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: {
    imageUrl: null,
    loading: false,
    error: null,

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
        state[key] = createEventSlice.initialState[key];
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const createEvent = (eventData) => {
  return async (dispatch) => {
    dispatch(createEventSlice.actions.setLoading(true));
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://www.arthkambhoj.me:8080/api/events/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        throw new Error("Event creation failed");
      }

      const data = await response.json();
      dispatch(createEventSlice.actions.resetState());
      return data;
    } catch (error) {
      dispatch(createEventSlice.actions.setError(error.message));
      throw error;
    } finally {
      dispatch(createEventSlice.actions.setLoading(false));
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
} = createEventSlice.actions;

export { uploadImage, createEvent };
export default createEventSlice.reducer;
