import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const postStagesData = createAsyncThunk(
  "stagesTimeline/postStagesData",
  async ({ eventId, stages }, { rejectWithValue }) => {
    try {
      const transformedStages = stages.map((stage, index) => ({
        day:
          typeof stage.day === "string"
            ? stage.day.replace("Day ", "") || index + 1
            : stage.day || index + 1,
        description: stage.description,
      }));

      console.log("Sending Stages Data:", {
        eventId,
        stages: transformedStages,
      });

      const response = await fetch(
        `https://arthkambhoj.me/api/events/${eventId}/timeline/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entries: transformedStages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const data = await response.json();

      console.log("API Response:", data);

      return data;
    } catch (error) {
      console.log("Error:", error.message);
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
