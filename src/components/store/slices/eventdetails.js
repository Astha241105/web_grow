import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEventDetails = createAsyncThunk(
  'eventDetails/fetchEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken'); 

      if (!token) {
        throw new Error('Authorization token not found.');
      }
      const response = await fetch(
        `https://arthkambhoj.me/api/v1/participant/events/details/${eventId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
    });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const eventDetailsSlice = createSlice({
  name: 'eventDetails',
  initialState: {
    data: null,
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearEventDetails: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearEventDetails } = eventDetailsSlice.actions;
export default eventDetailsSlice.reducer;
