import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const validateOtp = createAsyncThunk(
  "otp/validateOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    console.log({ email, otp })
    try {
      const response = await fetch("https://webgrowproject-1.onrender.com/api/v1/auth/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      
      if (!response.ok) {
        throw new Error("OTP validation failed");
      }
      // console.log(response.json());
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

export const resendOtp = createAsyncThunk(
  "otp/resendOtp",
  async ({ firstname, lastname, email, mobile,password, organization,designation,role  }, { rejectWithValue }) => {
    try {
      console.log({ firstname, lastname, email, mobile,password, organization,designation,role  })
      const response = await fetch("https://webgrowproject.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, mobile, password,organization,designation,role  }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }
      console.log(response);
      return await response.json();
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
      .addCase(validateOtp.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(validateOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resendOtp.pending, (state) => {
        state.status = "resending";
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.status = "resent";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default otpSlice.reducer;
