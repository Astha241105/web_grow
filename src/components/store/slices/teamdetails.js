import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch team details using fetch with token from localStorage
export const fetchTeamDetails = createAsyncThunk(
  'teamDetails/fetchTeamDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make the GET request with the token in the Authorization header
      const response = await fetch(`https://arthkambhoj.me/api/v1/participant/teams/detail/${eventId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is okay (status 200-299)
      if (!response.ok) {
        throw new Error('Failed to fetch team details');
      }

      const data = await response.json(); // Parse the response JSON
      return data.data; // Return the team details from the response
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred while fetching team details');
    }
  }
);

// Team details slice
const teamDetailsSlice = createSlice({
  name: 'teamDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeamDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTeamDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default teamDetailsSlice.reducer;
