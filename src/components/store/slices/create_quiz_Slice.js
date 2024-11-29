import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const createQuiz = createAsyncThunk(
  "quiz/createQuiz",
  async ({ eventId, title, description, questions }, { rejectWithValue }) => {
    try {
      const payload = {
        title,
        description,
        questions: questions.map((q) => ({
          questionText: q.question,
          options: q.options,
          correctAnswer: q.options[q.correctOption],
        })),
      };

      const response = await fetch(
        `http://35.154.224.49:8080/api/host/quiz/${eventId}/add-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const quizCreateSlice = createSlice({
  name: "quizCreate",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetQuizCreateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuiz.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetQuizCreateState } = quizCreateSlice.actions;
export default quizCreateSlice.reducer;
