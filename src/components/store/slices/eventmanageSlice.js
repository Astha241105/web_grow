import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchEvents = createAsyncThunk(
  "eventmanage/fetchEvents",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
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
        id: item.data.id,
        title: item.data.title,
        college: item.data.location,
        tag: item.data.category,
        date: item.data.lastUpdate,
        mode: item.data.mode,
        impressions: item.data.impressions || 0,
        registrations: item.data.registrations || 0,
        imageUrl: item.data.imageUrl || "",
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "eventmanage/deleteEvent",
  async (eventId, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/events/delete/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete event");
      }

      dispatch(fetchEvents());

      return eventId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const eventmanageSlice = createSlice({
  name: "eventmanage",
  initialState: {
    events: [],
    status: "idle",
    error: null,
    deleteStatus: "idle",
    deleteError: null,
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
      })

      .addCase(deleteEvent.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload;
      });
  },
});

export default eventmanageSlice.reducer;
