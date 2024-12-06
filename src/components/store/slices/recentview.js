import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecentViews = createAsyncThunk(
  'recentViews/fetchRecentViews',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const authToken = localStorage.getItem("authToken")

      const response = await fetch('http://www.arthkambhoj.me.:8080/api/v1/participant/viewed?page=0&size=3', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recent views');
      }

      const data = await response.json();
      console.log(data.content)
      return data.content; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recentViewsSlice = createSlice({
  name: 'recentViews',
  initialState: {
    views: [],
    status: 'idle', 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentViews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecentViews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.views = action.payload; 
      })
      .addCase(fetchRecentViews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default recentViewsSlice.reducer;
