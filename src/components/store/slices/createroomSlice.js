import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for creating rooms for an event using Fetch API
export const createEventRooms = createAsyncThunk(
  "rooms/createEventRooms",
  async ({ eventId, roomCount, roomNames }, { rejectWithValue }) => {
    try {
      // Construct the API endpoint with the eventId
      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/events/events/${eventId}/rooms/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCount,
            roomNames,
          }),
        }
      );

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Room creation failed");
      }

      return await response.json();
    } catch (error) {
      // Handle any errors during room creation
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Create a slice for room management
const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Additional reducers if needed
    resetRoomState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEventRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEventRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        state.success = true;
        state.error = null;
      })
      .addCase(createEventRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRoomState } = roomsSlice.actions;
export default roomsSlice.reducer;
