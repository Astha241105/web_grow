import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken'); 

      if (!token) {
        throw new Error('Authorization token not found.');
      }

      const response = await fetch(
        `https://arthkambhoj.me/api/v1/participant/events/${eventId}/teams/search`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    status: 'idle',
    teams: [], 
    error: null, 
  },
  reducers: {
    clearTeamsState: (state) => {
      state.status = 'idle';
      state.teams = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload; 
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearTeamsState } = teamsSlice.actions;
export default teamsSlice.reducer;
