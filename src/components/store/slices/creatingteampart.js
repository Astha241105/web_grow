import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async ({ eventId, teamData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken'); 

      if (!token) {
        throw new Error('Authorization token not found.');
      }

      const response = await fetch(
        `http://webgrowproject-1.onrender.com/api/v1/participant/events/${eventId}/teams/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(teamData),
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

const createTeamSlice = createSlice({
  name: 'createTeam',
  initialState: {
    status: 'idle', 
    data: null,
    error: null, 
  },
  reducers: {
    clearCreateTeamState: (state) => {
      state.status = 'idle';
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearCreateTeamState } = createTeamSlice.actions;
export default createTeamSlice.reducer;
