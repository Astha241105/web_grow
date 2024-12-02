import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEventDetailsPublic = createAsyncThunk(
  'eventDetailsPublic/fetchEventDetailsPublic',
  async (eventId, { rejectWithValue}) => {
    try {

      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/v1/public/homepage/events/details/${eventId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }

      const data = await response.json();
      console.log(data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching event details');
    }
  }
);

const eventDetailsPublicSlice = createSlice({
  name: 'eventDetailsPublic',
  initialState: {
    event: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetailsPublic.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEventDetailsPublic.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.event = action.payload;
      })
      .addCase(fetchEventDetailsPublic.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default eventDetailsPublicSlice.reducer;
