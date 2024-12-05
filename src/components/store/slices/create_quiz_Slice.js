import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const addQuizQuestions = createAsyncThunk(
  "quiz/addQuestions",
  async ({ eventId, questions }, { rejectWithValue }) => {
    try {
      const formattedQuestions = questions.map((q) => ({
        questionText: q.question,
        options: q.options,
        correctAnswer:
          q.correctOption !== null ? q.options[q.correctOption] : null,
      }));
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No authentication token found");
        return rejectWithValue("No authentication token found");
      }
      console.log("Sending Payload:", {
        eventId,
        questions: formattedQuestions,
        token: token ? "Token Present" : "No Token",
      });
      const response = await fetch(
        `https://www.arthkambhoj.me/api/host/quiz/${eventId}/add-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId,
            questions: formattedQuestions,
          }),
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error Response Status:", response.status);
        console.error("Error Response Text:", errorText);

        return rejectWithValue(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Network Error Details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      if (error instanceof TypeError) {
        return rejectWithValue(
          "Network error. Please check your internet connection."
        );
      }

      return rejectWithValue(
        error.message || "An unexpected error occurred during quiz submission"
      );
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
