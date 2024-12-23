import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchParticipantProfile = createAsyncThunk(
  'participant/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('Auth token not found');

      const response = await fetch('https://arthkambhoj.me/api/v1/participant/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }

      const data = await response.json();
      console.log(data);
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateParticipantProfile = createAsyncThunk(
  'participant/updateProfile',
  async (updatedData, { rejectWithValue }) => {
    try {
      console.log(updatedData)
      const authToken = localStorage.getItem('authToken');
      if (!authToken) throw new Error('Auth token not found');

      const response = await fetch('https://arthkambhoj.me/api/v1/participant/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      console.log(data);
      return data.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const participantSlice = createSlice({
  name: 'participant',
  initialState: {
    profile: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchParticipantProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchParticipantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchParticipantProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateParticipantProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateParticipantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload; 
      })
      .addCase(updateParticipantProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = participantSlice.actions;
export default participantSlice.reducer;
