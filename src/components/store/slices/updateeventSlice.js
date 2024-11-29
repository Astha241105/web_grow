import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for updating an event
export const updateEventApi = createAsyncThunk(
  "events/updateEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Prepare the payload matching the API requirements
      const payload = {
        title: eventData.opportunityTitle,
        description: eventData.aboutOpportunity,
        location: eventData.organization,
        registerStart: eventData.registerStart,
        imageUrl:
          eventData.imageUrl ||
          "https://webgrowbucket.s3.ap-south-1.amazonaws.com/default",
        mode: eventData.eventMode.toUpperCase(),
        registerEnd: eventData.registerEnd,
        capacityMin: eventData.minTeamSize,
        capacityMax: eventData.maxTeamSize,
        category: eventData.opportunityType,
        festival: eventData.festival || null,
      };

      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/events/update/${eventData.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the event"
      );
    }
  }
);

// Update event slice
const updateEventSlice = createSlice({
  name: "updateEvent",
  initialState: {
    eventData: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.eventData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEventApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEventApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.eventData = action.payload;
      })
      .addCase(updateEventApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
        state.success = false;
      });
  },
});

export const { resetUpdateState } = updateEventSlice.actions;
export default updateEventSlice.reducer;
