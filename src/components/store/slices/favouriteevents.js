import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFavoriteEvents = createAsyncThunk(
  'favorites/fetchFavoriteEvents',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken'); 

      if (!token) {
        throw new Error('Authorization token not found.');
      }

      const response = await fetch('http://www.arthkambhoj.me.:8080/api/v1/participant/events/favourites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data.data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    data: [],
    status: 'idle', 
    error: null,
  },
  reducers: {
    clearFavorites: (state) => {
      state.data = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteEvents.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFavoriteEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchFavoriteEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
