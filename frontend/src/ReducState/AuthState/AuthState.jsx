// src/ReduxState/AuthState/AuthStates.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= AXIOS CONFIG ================= */
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // for cookies/session
  headers: { "Content-Type": "application/json" },
});

/* ================= REGISTER ================= */
export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/register", formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= VERIFY OTP ================= */
export const VerifyOtp = createAsyncThunk(
  "auth/dashboard",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/verify-otp", { useremail: email, otp });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= LOGIN ================= */
export const LoginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/login", formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= CHECK USER ================= */
export const CheckUser = createAsyncThunk(
  "auth/checkUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/checkUser");
      return data.user;
    } catch (err) {
      if (err.response?.status === 401) return rejectWithValue("Unauthorized: Please login again");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= FORGOT PASSWORD ================= */
export const ForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/forgot-password", { useremail: email });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= RESET PASSWORD ================= */
export const ResetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/reset-password", { useremail: email, otp, newPassword });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= RESEND OTP ================= */
export const ResendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/regenerate-otp", { useremail: email });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= FETCH ALL USERS ================= */
export const fetchAllUsers = createAsyncThunk(
  "auth/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/alluser");
      return data.users || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= UPDATE USER ROLE ================= */
export const updateUserRole = createAsyncThunk(
  "auth/updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put(`/fetch/${userId}`, { role });
      return { userId, role, message: data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* ================= INITIAL STATE ================= */
const initialState = {
  user: null,
  users: [],
  loading: false,
  otpVerified: false,
  forgotPasswordSent: false,
  passwordReset: false,
  error: null,
};

/* ================= SLICE ================= */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    resetOtp: (state) => {
      state.otpVerified = false;
    },
    resetForgotPassword: (state) => {
      state.forgotPasswordSent = false;
      state.passwordReset = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(RegisterUser.pending, (state) => { state.loading = true; })
      .addCase(RegisterUser.fulfilled, (state) => { state.loading = false; })
      .addCase(RegisterUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* VERIFY OTP */
      .addCase(VerifyOtp.pending, (state) => { state.loading = true; })
      .addCase(VerifyOtp.fulfilled, (state) => { state.loading = false; state.otpVerified = true; })
      .addCase(VerifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* LOGIN */
      .addCase(LoginUser.pending, (state) => { state.loading = true; })
      .addCase(LoginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload.user; })
      .addCase(LoginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* CHECK USER */
      .addCase(CheckUser.pending, (state) => { state.loading = true; })
      .addCase(CheckUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload || null; })
      .addCase(CheckUser.rejected, (state, action) => { state.loading = false; state.user = null; state.error = action.payload; })

      /* FORGOT PASSWORD */
      .addCase(ForgotPassword.pending, (state) => { state.loading = true; })
      .addCase(ForgotPassword.fulfilled, (state) => { state.loading = false; state.forgotPasswordSent = true; })
      .addCase(ForgotPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* RESET PASSWORD */
      .addCase(ResetPassword.pending, (state) => { state.loading = true; })
      .addCase(ResetPassword.fulfilled, (state) => { state.loading = false; state.passwordReset = true; })
      .addCase(ResetPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* RESEND OTP */
      .addCase(ResendOtp.pending, (state) => { state.loading = true; })
      .addCase(ResendOtp.fulfilled, (state) => { state.loading = false; })
      .addCase(ResendOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* FETCH USERS */
      .addCase(fetchAllUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchAllUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* UPDATE USER ROLE */
      .addCase(updateUserRole.pending, (state) => { state.loading = true; })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u._id === action.payload.userId);
        if (index !== -1) {
          state.users[index].userrole = action.payload.role;
        }
      })
      .addCase(updateUserRole.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout, resetOtp, resetForgotPassword } = authSlice.actions;
export default authSlice.reducer;
