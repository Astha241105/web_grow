import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://webgrowproject-1.onrender.com/api/v1/participant/events';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, thunkAPI) => { 
    try {
      const authToken = localStorage.getItem('authToken');
      console.log(authToken);

      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.data);
      return data.data; 
    } catch (error) {
      console.error('Error fetching events:', error);
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch events');
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload; 
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default eventsSlice.reducer;
