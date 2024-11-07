import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const forgotPassword = createAsyncThunk(
  "passwordReset/forgotPassword",
  async (email, { rejectWithValue }) => {
    console.log(email);
    try {
      const response = await fetch(
        "https://webgrowproject.onrender.com/api/v1/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Invalid email");
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: "Error occurred" });
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    loading: false,
    error: null,
    success: false,
    message: "",
  },
  reducers: {
    clearPasswordResetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export const { clearPasswordResetState } = passwordResetSlice.actions;
export default passwordResetSlice.reducer;
