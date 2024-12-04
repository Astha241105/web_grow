import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const removeFavouriteEvent = createAsyncThunk(
  'favourite/removeFavouriteEvent',
  async ({ eventId}, { rejectWithValue }) => {
    try {
    const token=localStorage.getItem("authToken")
      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/v1/participant/events/${eventId}/favourites`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove favorite');
      }

      const data= await response.json();
      console.log(data,"favs")
      return data

    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

const removeFavouriteSlice = createSlice({
  name: 'favourite',
  initialState: {
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeFavouriteEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(removeFavouriteEvent.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(removeFavouriteEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to remove event from favourites';
      });
  },
});

export default removeFavouriteSlice.reducer;
