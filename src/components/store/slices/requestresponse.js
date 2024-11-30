import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const handleJoinRequestResponse = createAsyncThunk(
  'joinrequestResponse/handleJoinRequestResponse',
  async ({ requestId, response }, { rejectWithValue }) => {
    try {
        console.log(response)
      const token = localStorage.getItem('authToken'); 
      
      const responseFromAPI = await fetch(`http://webgrowproject-1.onrender.com/api/v1/participant/teams/join/request/${requestId}?response=${response}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      });
      
      if (!responseFromAPI.ok) {
        throw new Error('Failed to respond to join request');
      }

      const data = await responseFromAPI.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const joinRequestResponseSlice = createSlice({
  name: 'joinrequestResponse',
  initialState: {
    responseStatus: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleJoinRequestResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleJoinRequestResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.responseStatus = action.payload;
      })
      .addCase(handleJoinRequestResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default joinRequestResponseSlice.reducer;
