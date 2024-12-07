import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching administrators
export const fetchEventAdministrators = createAsyncThunk(
  "administrators/fetchEventAdministrators",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        `https://arthkambhoj.me/api/events/${eventId}/administrators`,
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
        throw new Error(errorData.message || "Failed to fetch administrators");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Administrators slice
const administratorsSlice = createSlice({
  name: "administrators",
  initialState: {
    administrators: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventAdministrators.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventAdministrators.fulfilled, (state, action) => {
        state.loading = false;
        state.administrators = action.payload;
        state.error = null;
      })
      .addCase(fetchEventAdministrators.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default administratorsSlice.reducer;
