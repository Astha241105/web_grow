import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const PUBLIC_BASE_URL = 'https://arthkambhoj.me/api/v1/public/homepage/events';

export const fetchEventsPublic = createAsyncThunk(
  'events/fetchEventsPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(PUBLIC_BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error('No events available');
      }

      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const fetchEventsPublicSlice = createSlice({
  name: 'fetchEventsPublic',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearEventsPublic: (state) => {
      state.events = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsPublic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsPublic.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload; 
      })
      .addCase(fetchEventsPublic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearEventsPublic } = fetchEventsPublicSlice.actions;
export default fetchEventsPublicSlice.reducer;
