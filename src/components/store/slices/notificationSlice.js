import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchEventNotifications = createAsyncThunk(
  "eventNotifications/fetchEventNotifications",
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://arthkambhoj.me/api/events/notifications/${page}/${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch event notifications"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventNotificationsSlice = createSlice({
  name: "eventNotifications",
  initialState: {
    notifications: [],
    totalPages: 0,
    currentPage: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    markEventNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.isRead = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.number;
      })
      .addCase(fetchEventNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { markEventNotificationAsRead } = eventNotificationsSlice.actions;
export default eventNotificationsSlice.reducer;
