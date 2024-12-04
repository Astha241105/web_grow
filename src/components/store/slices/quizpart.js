import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuizQuestions',
  async ({ eventId, page }, { rejectWithValue }) => {
    try {
        const authToken=localStorage.getItem("authToken")
      const response = await fetch(`https://arthkambhoj.me/api/participant/quiz/${eventId}/questions/${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quiz questions');
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const submitQuizAnswer = createAsyncThunk(
  'quiz/submitQuizAnswer',
  async ({ eventId, questionId, answer ,selectedOption}, { rejectWithValue }) => {
    try {
        console.log(eventId)
        console.log(questionId)
        console.log(answer)
        console.log(selectedOption)
      const authToken=localStorage.getItem("authToken")
      console.log(authToken)
      const response = await fetch(
        `https://arthkambhoj.me/api/participant/quiz/${eventId}/questions/${questionId}/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            eventId,
            questionId,
            selectedOption,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }
      const responseText = await response.text();
      console.log('Response Text:', responseText);

    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    question: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetQuizState: (state) => {
      state.question = null;
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
        state.question = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitQuizAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitQuizAnswer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitQuizAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizState } = quizSlice.actions;

export default quizSlice.reducer;
