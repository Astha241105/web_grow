import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const validateHostOtp = createAsyncThunk(
  "hostOtp/validateHostOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log({ email, otp });
    try {
        console.log("Request payload:",{ email, otp });
      const response = await fetch("http://webgrowproject-1.onrender.com/api/v1/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      console.log("sent request");
      
      if (!response.ok) {
        console.log("error")
        throw new Error("Host OTP validation failed");
      }

      const data = await response.json();
      console.log(data);
      if (data.data.token) {
        localStorage.setItem("authToken", data.data.token);
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hostOtpSlice = createSlice({
  name: "hostOtp",
  initialState: {
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(validateHostOtp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(validateHostOtp.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.token) {
          localStorage.setItem("hostToken", action.payload.token);
        }
      })
      .addCase(validateHostOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default hostOtpSlice.reducer;
