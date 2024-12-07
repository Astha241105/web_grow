import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const postStagesData = createAsyncThunk(
  "stagesTimeline/postStagesData",
  async ({ eventId, stages }, { rejectWithValue }) => {
    try {
      const entries = stages.map((stage, index) => ({
        day: index + 1,
        description: stage.description,
      }));
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `https://arthkambhoj.me/api/events/${eventId}/timeline/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
          body: JSON.stringify({ entries }),
        }
      );

      console.log("API Response:", response);
    } catch (error) {
      console.log("Error:", error);
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  stages: [],
  loading: false,
  error: null,
};

const stagesTimelineSlice = createSlice({
  name: "stagesTimeline",
  initialState,
  reducers: {
    setStages: (state, action) => {
      state.stages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postStagesData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postStagesData.fulfilled, (state, action) => {
        state.loading = false;
        state.stages = action.payload.entries;
      })
      .addCase(postStagesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setStages } = stagesTimelineSlice.actions;
export default stagesTimelineSlice.reducer;
