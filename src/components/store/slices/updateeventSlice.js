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
      const response = await fetch("http://www.arthkambhoj.me:8080/s3/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
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

export const updateEventApi = createAsyncThunk(
  "events/updateEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      // Validate required fields
      const requiredFields = [
        "eventId",
        "opportunityTitle",
        "aboutOpportunity",
        "organization",
        "registerStart",
        "registerEnd",
        "eventMode",
        "minTeamSize",
        "maxTeamSize",
        "opportunityType",
      ];

      requiredFields.forEach((field) => {
        if (!eventData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      });

      // Prepare the payload matching the API requirements
      const payload = {
        title: eventData.opportunityTitle,
        description: eventData.aboutOpportunity,
        location: eventData.organization,
        registerStart: eventData.registerStart,
        imageUrl:
          eventData.imageUrl ||
          "https://webgrowbucket.s3.ap-south-1.amazonaws.com/default",
        mode: eventData.eventMode.toUpperCase(),
        registerEnd: eventData.registerEnd,
        capacityMin: eventData.minTeamSize,
        capacityMax: eventData.maxTeamSize,
        category: eventData.opportunityType,
        festival: eventData.festival || null,
      };

      const response = await fetch(
        `http://www.arthkambhoj.me:8080/api/events/update/${eventData.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating the event"
      );
    }
  }
);

// Update event slice
const updateEventSlice = createSlice({
  name: "updateEvent",
  initialState: {
    imageUrl: null,
    eventData: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetUpdateState: (state) => {
      state.imageUrl = null;
      state.eventData = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setUpdateEventData: (state, action) => {
      state.eventData = { ...state.eventData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Image upload cases
    builder
      .addCase(uploadEventImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadEventImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
        state.error = null;
      })
      .addCase(uploadEventImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.imageUrl = null;
      })
      // Update event cases
      .addCase(updateEventApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateEventApi.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.eventData = action.payload;
      })
      .addCase(updateEventApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
        state.success = false;
      });
  },
});

export const { resetUpdateState, setUpdateEventData } =
  updateEventSlice.actions;
export default updateEventSlice.reducer;
