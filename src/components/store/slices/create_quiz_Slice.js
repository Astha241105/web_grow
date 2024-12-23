import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const addQuizQuestions = createAsyncThunk(
  "quiz/addQuestions",
  async ({ eventId, questions }, { rejectWithValue }) => {
    try {
      // questions.forEach((q, index) => {
      //   console.log(`Question ${index + 1}:`, {
      //     questionText: q.question,
      //     options: q.options,
      //     correctOption: q.correctOption,
      //     correctAnswer:
      //       q.correctOption !== null ? q.options[q.correctOption] : null,
      //   });
      // });
      const token = localStorage.getItem("authToken");
      // console.log("Authentication Token:", token ? "Present" : "Missing");

      const API_URL = `https://arthkambhoj.me/api/host/quiz/${eventId}/add-questions`;
      //      console.log("API URL:", API_URL);

      const formattedQuestions = questions.map((q) => ({
        questionText: q.question,
        options: q.options,
        correctAnswer:
          q.correctOption !== null ? q.options[q.correctOption] : null,
      }));
      //   const fetchConfig = {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: token ? `Bearer ${token}` : undefined,
      //     },
      //     body: JSON.stringify({
      //  formattedQuestions,
      //     }),
      //   };
      //   console.log("Fetch Configuration:", fetchConfig);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify(formattedQuestions),
      });

      console.log("Response Status:", response);

      // if (!response.ok) {
      //   const errorText = await response.text();
      //   console.error("Error Response:", errorText);

      //   // return rejectWithValue(
      //   //   `HTTP error! status: ${response.status}, message: ${errorText}`
      //   // );
      // }

      // const responseData = await response.json();
      // console.log("Response Data:", responseData);

      // return responseData;
    } catch (error) {
      console.error("Submission Error:", error);

      // return rejectWithValue(
      //   error.message || "An unexpected error occurred during quiz submission"
      // );
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
