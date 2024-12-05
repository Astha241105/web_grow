import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const addQuizQuestions = createAsyncThunk(
  "quiz/addQuestions",
  async ({ eventId, questions }, { rejectWithValue }) => {
    try {
      const formattedQuestions = questions.map((q) => ({
        questionText: q.question,
        options: q.options,
        correctAnswer: q.options[q.correctOption],
      }));

      const token = localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const response = await fetch(
        `https://www.arthkambhoj.me/api/host/quiz/${eventId}/add-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedQuestions),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add questions");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message || "An unexpected error occurred");
    }
  }
);

const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetQuizQuestionsState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuizQuestions.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(addQuizQuestions.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to add questions";
      });
  },
});

export const { resetQuizQuestionsState } = quizQuestionsSlice.actions;

export default quizQuestionsSlice.reducer;
