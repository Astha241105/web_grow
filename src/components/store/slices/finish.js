import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const submitFinalQuiz = createAsyncThunk(
  'quizfinal/submitFinalQuiz',
  async ({ quizId }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://www.arthkambhoj.me.:8080/api/participant/quiz/${quizId}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to submit quiz');
      }
      const data= await response.json();
      console.log(data)
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);


const quizfinalSlice = createSlice({
  name: 'quizfinal', 
  initialState: {
    status: 'idle',
    error: null,
    result: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFinalQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitFinalQuiz.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(submitFinalQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default quizfinalSlice.reducer;
