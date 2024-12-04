import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async ({ eventId }, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('authToken'); 
        console.log(token)
        if (!token) {
          throw new Error('Authorization token not found.');
        }
      const response = await fetch(
        `https://arthkambhoj.me/api/v1/participant/events/${eventId}/favourites`,
        {
          method: 'POST',
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
      console.log(data,"favs")
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


const addToFavoritesSlice = createSlice({
  name: 'addToFavorites',
  initialState: {
    status: 'idle',
    error: null,
    message: null, 
  },
  reducers: {
    clearAddToFavoritesState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message || 'Event added to favorites successfully';
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearAddToFavoritesState } = addToFavoritesSlice.actions;
export default addToFavoritesSlice.reducer;
