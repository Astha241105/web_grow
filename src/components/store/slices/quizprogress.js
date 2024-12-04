import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuizStatus = createAsyncThunk(
  'quizStatus/fetchQuizStatus',
  async ({ eventId }, { rejectWithValue }) => {
    try {
        const token=localStorage.getItem("authToken")
      const response = await fetch(`https://arthkambhoj.me/api/participant/quiz/${eventId}/progress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch quiz status');
      }

      const data = await response.json();
      console.log(data,"logged")
      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const quizStatusSlice = createSlice({
  name: 'quizStatus',
  initialState: {
    status: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetQuizStatusState: (state) => {
      state.status = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(fetchQuizStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizStatusState } = quizStatusSlice.actions;

export default quizStatusSlice.reducer;
