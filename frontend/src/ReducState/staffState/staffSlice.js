import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/staff"; // Update if needed

// Fetch staff
export const fetchStaff = createAsyncThunk(
  "staff/fetchStaff",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/view`);
      return response.data.staff;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create staff
export const createStaff = createAsyncThunk(
  "staff/createStaff",
  async (staffData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, staffData);
      return response.data.staff;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update staff
export const updateStaff = createAsyncThunk(
  "staff/updateStaff",
  async ({ id, staffData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, staffData);
      return response.data.staff;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete staff
export const deleteStaff = createAsyncThunk(
  "staff/deleteStaff",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState: { staffList: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchStaff.fulfilled, (state, action) => { state.loading = false; state.staffList = action.payload; })
      .addCase(fetchStaff.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed"; })

      .addCase(createStaff.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createStaff.fulfilled, (state, action) => { state.loading = false; state.staffList.push(action.payload); })
      .addCase(createStaff.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed"; })

      .addCase(updateStaff.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.map((s) => s._id === action.payload._id ? action.payload : s);
      })
      .addCase(updateStaff.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed"; })

      .addCase(deleteStaff.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.staffList = state.staffList.filter((s) => s._id !== action.payload);
      })
      .addCase(deleteStaff.rejected, (state, action) => { state.loading = false; state.error = action.payload?.message || "Failed"; });
  },
});

export default staffSlice.reducer;
