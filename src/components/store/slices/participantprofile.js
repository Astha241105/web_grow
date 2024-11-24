import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://35.154.224.49:8080/api/v1/participant/profile';

export const fetchParticipantProfile = createAsyncThunk(
  'participantProfile/fetchParticipantProfile',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); 
      console.log(token)
      if (!token) {
        throw new Error('No authentication token found.');
      }

      const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch participant profile');
    }
  }
);


const participantProfileSlice = createSlice({
  name: 'participantProfile',
  initialState: {
    profile: null,
    status: 'idle',
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParticipantProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchParticipantProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchParticipantProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default participantProfileSlice.reducer;
