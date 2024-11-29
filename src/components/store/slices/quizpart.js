import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuizQuestions',
  async ({ eventId, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://35.154.224.49:8080/api/participant/quiz/${eventId}/questions/${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetQuizState: (state) => {
      state.questions = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizState } = quizSlice.actions;

export default quizSlice.reducer;
