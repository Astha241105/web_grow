import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEventDetails = createAsyncThunk(
  "event_details/fetchEventDetails",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authorization token not found.");
      }
      console.log(eventId);
      const response = await fetch(
        `https://arthkambhoj.me/api/events/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch event details");
      }

      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const event_DetailsSlice = createSlice({
  name: "event_details",
  initialState: {
    event: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default event_DetailsSlice.reducer;
