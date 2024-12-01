import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://www.arthkambhoj.me.:8080/api/v1/participant/events/registered';


export const fetchRegisteredEvents = createAsyncThunk(
  'events/fetchRegisteredEvents',
  async (_, thunkAPI) => {
    try {

      console.log("ok")
      const token = localStorage.getItem('authToken'); 
      console.log(token)
  
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch registered events');
      }

      const data = await response.json();
      console.log(data)
      return data.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch registered events');
    }
  }
);


const registeredEventsSlice = createSlice({
  name: 'registeredEvents',
  initialState: {
    events: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisteredEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRegisteredEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(fetchRegisteredEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default registeredEventsSlice.reducer;
