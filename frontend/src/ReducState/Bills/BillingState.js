import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/api/bill";

// Create bill
export const createBilling = createAsyncThunk(
  "billing/createBilling",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_BASE}/from-booking`, data);
      return res.data.bill;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Fetch all bills
export const fetchBillings = createAsyncThunk(
  "billing/fetchBillings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_BASE}/view`);
      return res.data.bills;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Update bill
export const updateBilling = createAsyncThunk(
  "billing/updateBilling",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_BASE}/${id}`, data);
      return res.data.bill;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const billingSlice = createSlice({
  name: "billing",
  initialState: {
    billings: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create bill
      .addCase(createBilling.pending, (state) => { state.loading = true; })
      .addCase(createBilling.fulfilled, (state, action) => { state.loading = false; state.billings.push(action.payload); state.success = true; })
      .addCase(createBilling.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Fetch bills
      .addCase(fetchBillings.pending, (state) => { state.loading = true; })
      .addCase(fetchBillings.fulfilled, (state, action) => { state.loading = false; state.billings = action.payload; })
      .addCase(fetchBillings.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Update bill
      .addCase(updateBilling.pending, (state) => { state.loading = true; })
      .addCase(updateBilling.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.billings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) state.billings[index] = action.payload;
        state.success = true;
      })
      .addCase(updateBilling.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearState } = billingSlice.actions;
export default billingSlice.reducer;
