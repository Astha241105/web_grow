import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTeamDetails = createAsyncThunk(
  "teamDetails/fetch",
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://arthkambhoj.me/api/v1/participant/teams/detail/${eventId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch team details");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teamDetailsSlice = createSlice({
  name: "teamDetails",
  initialState: {
    team: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetTeamDetails: (state) => {
      state.team = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTeamDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.team = action.payload;
      })
      .addCase(fetchTeamDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetTeamDetails } = teamDetailsSlice.actions;

export default teamDetailsSlice.reducer;
