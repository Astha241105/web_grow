import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTimelineEntries = createAsyncThunk(
  "timeline/fetchEntries",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(
        `https://arthkambhoj.me/api/events/${eventId}/timeline/bulk`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entries: [
              { day: 1, description: "Day 1 description" },
              { day: 2, description: "Day 2 description" },
              { day: 3, description: "Day 3 description" },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch timeline entries"
        );
      }

      const data = await response.json();
      return data.entries;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    entries: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearTimeline: (state) => {
      state.entries = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelineEntries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTimelineEntries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entries = action.payload;
      })
      .addCase(fetchTimelineEntries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "An unknown error occurred";
      });
  },
});

export const { clearTimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
