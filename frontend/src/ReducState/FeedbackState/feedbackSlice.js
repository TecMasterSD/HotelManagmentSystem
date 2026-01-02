import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/feedback";

/* ================= FETCH ALL FEEDBACKS ================= */
export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}`);
      return res.data.feedbacks;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Server Error");
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearFeedbackState: (state) => {
      state.feedbacks = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => { state.loading = true; })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
