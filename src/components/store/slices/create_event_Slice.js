import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const uploadEventImage = createAsyncThunk(
  "events/uploadImage",
  async (file, { rejectWithValue }) => {
    try {
      const keyName = `event_image_${Date.now()}_${file.name}`;
      const formData = new FormData();
      formData.append("keyName", keyName);
      formData.append("file", file);
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(
        "https://arthkambhoj.me/s3/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload Error Response:", errorText);
        throw new Error(errorText || "Image upload failed");
      }
      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const responseText = await response.text();
        console.log("Non-JSON Response:", responseText);
        if (responseText) {
          return `https://webgrowbucket.s3.ap-south-1.amazonaws.com/${keyName}`;
        }

        throw new Error("Unexpected response format");
      }
      if (data && data.imageUrl) {
        return data.imageUrl;
      } else if (data && typeof data === "string") {
        return `https://webgrowbucket.s3.ap-south-1.amazonaws.com/${keyName}`;
      }

      throw new Error("Invalid response from image upload");
    } catch (error) {
      console.error("Image Upload Error:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const createEventApi = createAsyncThunk(
  "events/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const requiredFields = [
        "imageUrl",
        "title",
        "description",
        "location",
        "mode",
        "registerStart",
        "registerEnd",
        "startTime",
        "endTime",
      ];

      requiredFields.forEach((field) => {
        if (!eventData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      });

      const response = await fetch(
        "https://arthkambhoj.me/api/events/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Event creation failed");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: {
    imageUrl: null,
    eventData: {},
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetState: (state) => {
      state.imageUrl = null;
      state.eventData = {};
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setEventData: (state, action) => {
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadEventImage.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadEventImage.fulfilled, (state, action) => {
      state.loading = false;
      state.imageUrl = action.payload;
      state.error = null;
    });
    builder.addCase(uploadEventImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.imageUrl = null;
    });
    builder.addCase(createEventApi.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createEventApi.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(createEventApi.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
  },
});

export const { resetState, setEventData } = createEventSlice.actions;
export default createEventSlice.reducer;
