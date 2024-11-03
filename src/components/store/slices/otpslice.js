import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const validateOtp = createAsyncThunk(
  "otp/validateOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log({ email, otp })
    try {
      const response = await fetch("https://webgrowproject.onrender.com/api/v1/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      
      if (!response.ok) {
        throw new Error("OTP validation failed");
      }

      const data = await response.json();
      console.log(data);
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.status = "success";
     
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default otpSlice.reducer;
