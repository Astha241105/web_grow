import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://www.arthkambhoj.me.:8080/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      
      console.log("Response Data:", data); 

      if (!response.ok) {
        console.error("Error in response:", data);
        return rejectWithValue(data.message || "Invalid username or password");
      }
      
      const token = data?.data?.token;
      if (token) {

        console.log("Extracted Token:", token);
        localStorage.setItem("authToken", token); 
        console.log("Token saved to localStorage:", token);


        const storedToken = localStorage.getItem("authToken");
        console.log("Token from localStorage:", storedToken);

        if (storedToken === token) {
          console.log("Token successfully saved in localStorage.");
        } else {
          console.error("Failed to store token in localStorage.");
        }
      } else {
        console.error("Token not found in the response data:", data);
      }

      return data; 
    } catch (error) {
      console.error("Error during login request:", error);
      return rejectWithValue("Invalid username or password");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.token = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
