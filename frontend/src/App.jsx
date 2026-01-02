// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

/* ================= REDUX ================= */
import { CheckUser } from "./ReducState/AuthState/AuthState";

/* ================= USER PAGES ================= */
import HomePage from "./pages/UserPage/HomePage";
import HotelDetails from "./pages/UserPage/HotelDetails";
import ListingPage from "./pages/UserPage/ListingPage";
import UserDashboard from "./pages/UserPage/UserDashboard";
import MyBookings from "./pages/UserPage/MyBookings";
import StayHistory from "./pages/UserPage/StayHistory";

/* ================= AUTH PAGES ================= */
import SignUp from "./pages/AuthPage/SignUp";
import Login from "./pages/AuthPage/LoginPage";
import OtpVerif from "./pages/AuthPage/OtpVarify";
import ForgotPassword from "./pages/AuthPage/ForgetPassword";

/* ================= USER LAYOUT ================= */
import UserNavbar from "./components/UserComponent/UserNavbar";
import UserFooter from "./components/UserComponent/UserFooter";

/* ================= ADMIN LAYOUT ================= */
import AdminLayout from "./components/AdminComponent/AdminLayout";

/* ================= ADMIN PAGES ================= */
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateRoom from "./pages/admin/RoomPage/RoomBooking";
import RoomView from "./pages/admin/RoomPage/RoomView";
import RoomUpdate from "./pages/admin/RoomPage/RoomUpdate";
import BookingView from "./pages/admin/BookingPage/BookingView";
import UserView from "./pages/admin/UserPage/UserView";
import BillingView from "./pages/admin/Baillngs/BilleView";
import BillingCreate from "./pages/admin/Baillngs/BillingCreate";
import BillingUpdate from "./pages/admin/Baillngs/BillingUpdate";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);

  /* ================= CHECK USER ON REFRESH ================= */
  useEffect(() => {
    dispatch(CheckUser());
  }, [dispatch]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  /* ================= LAYOUT CONTROL ================= */
  const authPages = [
    "/auth/login",
    "/auth/signup",
    "/auth/otp-verify",
    "/auth/forgot-password",
  ];

  const isAdminPath = location.pathname.startsWith("/admin");
  const hideUserLayout =
    authPages.includes(location.pathname.toLowerCase()) || isAdminPath;

  /* ================= ROLE CHECK ================= */
  const isAdmin = user?.userrole === "admin";

  return (
    <div className="App">
      {!hideUserLayout && <UserNavbar />}

      <Routes>
        {/* ================= ROOT ================= */}
        <Route
          path="/"
          element={
            user ? (
              isAdmin ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />

        {/* ================= AUTH ================= */}
        <Route
          path="/auth/login"
          element={user ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/otp-verify" element={<OtpVerif />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/home"
          element={!user ? <Navigate to="/auth/login" /> : <HomePage />}
        />
        <Route
          path="/hotel/:id"
          element={!user ? <Navigate to="/auth/login" /> : <HotelDetails />}
        />
        <Route
          path="/listing"
          element={!user ? <Navigate to="/auth/login" /> : <ListingPage />}
        />

        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/auth/login" /> : <UserDashboard />}
        />
        <Route
          path="/dashboard/my-bookings"
          element={!user ? <Navigate to="/auth/login" /> : <MyBookings />}
        />
        <Route
          path="/dashboard/stay-history"
          element={!user ? <Navigate to="/auth/login" /> : <StayHistory />}
        />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/rooms/create"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <CreateRoom />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/rooms/view"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <RoomView />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/rooms/update/:id"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <RoomUpdate />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/bookings/view"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <BookingView />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/users/view"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <UserView />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/billing/view"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <BillingView />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/billing/create"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <BillingCreate />
              </AdminLayout>
            )
          }
        />

        <Route
          path="/admin/billing/update/:id"
          element={
            !isAdmin ? (
              <Navigate to="/" />
            ) : (
              <AdminLayout>
                <BillingUpdate />
              </AdminLayout>
            )
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!hideUserLayout && <UserFooter />}
    </div>
  );
}

export default App;
