import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerHost = createAsyncThunk(
  "host/register",
  async (hostDetails, { rejectWithValue }) => {
    try {
      console.log("Request payload:", hostDetails); 

      const response = await fetch("https://webgrowproject.onrender.com/api/v1/auth/register-host", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hostDetails),
      });

      console.log("Response object:", response); 

      if (!response.ok) {
        throw new Error("Host registration failed");
      }

      const data = await response.json();
      console.log("Response data:", data); 

      return data;
    } catch (error) {
      console.error("Error:", error.message); 
      return rejectWithValue(error.message);
    }
  }
);

const hostSlice = createSlice({
  name: "host",
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    organization: "",
    designation: "",
    password: "",
    status: null,
    error: null,
  },
  reducers: {
    updateHostDetails: (state, action) => {
      return { ...state, ...action.payload };
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(registerHost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerHost.fulfilled, (state, action) => {
        state.status = "success";
        const { token } = action.payload;
        if (token) {
          localStorage.setItem("authToken", token);
        }
      })
      .addCase(registerHost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateHostDetails } = hostSlice.actions;
export default hostSlice.reducer;
