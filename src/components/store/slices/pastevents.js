import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPastEvents = createAsyncThunk(
  'pastEvents/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const token= localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch('http://www.arthkambhoj.me.:8080/api/v1/participant/past-events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch past events');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pastEventsSlice = createSlice({
  name: 'pastEvents',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchPastEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pastEventsSlice.reducer;
