import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const fetchQuizResults = createAsyncThunk(
  "quizresults/fetchQuizResults",
  async ({ quizId }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/participant/quiz/${quizId}/results`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch quiz results');
      }
     const data =await response.json();
      console.log(data)
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "quizresults/fetchLeaderboard", 
  async ({ quizId }, { rejectWithValue }) => {
    try {
        const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/participant/quiz/${quizId}/leaderboard-and-scores`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
     const data =await response.json();
      console.log(data)
      return data
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong');
    }
  }
);

const quizresultsSlice = createSlice({
  name: "quizresults", 
  initialState: {
    quizResults: null,
    leaderboard: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizResults = action.payload;
      })
      .addCase(fetchQuizResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchLeaderboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default quizresultsSlice.reducer;