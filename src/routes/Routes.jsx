import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/shared/PrivateRoute";

import Home from "../pages/home/Home";
import AllAppointments from "../pages/AllAppointments";
import DoctorDetails from "../pages/DoctorDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MyBookings from "../pages/dashboard/MyBookings";
import MyProfile from "../pages/dashboard/MyProfile";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="appointments" element={<AllAppointments />} />
        <Route
          path="doctors/:id"
          element={
            <PrivateRoute>
              <DoctorDetails />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<MyBookings />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="profile" element={<MyProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;