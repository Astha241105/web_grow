import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchHosts = createAsyncThunk(
  "hosts/fetchHosts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://arthkambhoj.me/api/events/role/HOST",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch hosts");
      }

      const data = await response.json();
      return data.map((host) => ({
        id: host.id,
        name: `${host.firstName} ${host.lastName}`,
        role: host.designation,
        institution: host.organization || "N/A",
        imageUrl: host.imageUrl,
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hostsSlice = createSlice({
  name: "hosts",
  initialState: {
    hosts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHosts.fulfilled, (state, action) => {
        state.loading = false;
        state.hosts = action.payload;
      })
      .addCase(fetchHosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default hostsSlice.reducer;
