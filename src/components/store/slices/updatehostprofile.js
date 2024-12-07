import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHostProfile = createAsyncThunk('hostProfile/fetchProfile', async (_, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('https://www.arthkambhoj.me/api/events/user/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'SUCCESS') {
      return data.data; 
    } else {
      throw new Error('Failed to fetch profile data');
    }
  } catch (error) {
    console.error('Fetch Profile Error:', error); 
    return rejectWithValue(error.message);
  }
});


export const updateHostProfile = createAsyncThunk('hostProfile/updateProfile', async (updatedData, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('https://www.arthkambhoj.me/api/events/user/updateprofile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile. Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'SUCCESS') {
      return data.data; // Return the updated profile data
    } else {
      throw new Error('Failed to update profile data');
    }
  } catch (error) {
    console.error('Update Profile Error:', error); // Log the error for debugging
    return rejectWithValue(error.message);
  }
});

const hostProfileSlice = createSlice({
  name: 'hostProfile',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch profile actions
      .addCase(fetchHostProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Save the fetched profile
      })
      .addCase(fetchHostProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      })
      
      // Update profile actions
      .addCase(updateHostProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHostProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload; // Update the profile with the returned data
      })
      .addCase(updateHostProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle errors
      });
  },
});

export default hostProfileSlice.reducer;
