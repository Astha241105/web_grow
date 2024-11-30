
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const joinTeamRequest = createAsyncThunk(
  'teamRequest/joinRequest',
  async (teamId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken');
      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/v1/participant/teams/${teamId}/join/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to send join request');
      }
      const data = await response.json();
       console.log(data)
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);


const initialState = {
  requestId: null,  
  loading: false,   
  error: null,     
};


const teamRequestSlice = createSlice({
  name: 'teamRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(joinTeamRequest.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(joinTeamRequest.fulfilled, (state, action) => {
        state.loading = false; 
        state.requestId = action.payload.id; 
      })
      .addCase(joinTeamRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; 
      });
  },
});

export default teamRequestSlice.reducer;
