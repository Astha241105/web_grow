import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createEventRooms = createAsyncThunk(
  "rooms/createEventRooms",
  async (roomData, { rejectWithValue }) => {
    try {
      // CHANGED: Removed separate eventId, roomCount parameters
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // CHANGED: Updated API endpoint
      const response = await fetch(
        `https://www.arthkambhoj.me/api/events/events/${roomData.eventId}/rooms/create?roomCount=${roomData.roomNames.length}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ADDED: Specify JSON content type
            Authorization: `Bearer ${token}`,
          },
          // CHANGED: Simplified payload structure
          body: JSON.stringify({
            roomNames: roomData.roomNames,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Room creation failed");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
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
