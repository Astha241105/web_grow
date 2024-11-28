// src/features/eventmanageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  "eventmanage/fetchEvents",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Replace with the actual token
    try {
      const response = await fetch(
        "http://www.arthkambhoj.me.:8080/api/events/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch events");
      }
      return data.content.map((item, index) => ({
        id: index + 1,
        title: item.data.title,
        college: item.data.location,
        tag: item.data.eventType,
        date: item.data.registerStart,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventmanageSlice = createSlice({
  name: "eventmanage",
  initialState: {
    events: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default eventmanageSlice.reducer;
