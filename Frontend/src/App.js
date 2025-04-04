import './App.css';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Login from './components/User/Login';
import LoginSeller from './components/User/LoginSeller';
import Register from './components/User/Register';
import RegisterSeller from './components/User/RegisterSeller';
import Home from './components/home'; // Temporary
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import store from './store';
import { loaduser } from './Actions/userActions';
import { loadSeller } from './Actions/sellerActions';
import Profile from './components/User/Profile';
import ProfileSeller from './components/User/ProfileSeller';
import ProtectedRoute from './route/ProtectedRoute';
import ProtectedRouteSeller from './route/ProtectedRouteSeller';
import UpdateProfile from './components/User/UpdateProfile';
import UpdateProfileSeller from './components/User/UpdateProfileSeller';
import UpdatePassword from './components/User/UpdatePassword';
import UpdatePasswordSeller from './components/User/UpdatePasswordSeller';
import ForgotPassword from './components/User/ForgotPassword';
import ForgotPasswordSeller from './components/User/ForgotPasswordSeller';
import ResetPassword from './components/User/ResetPassword';
import ResetPasswordSeller from './components/User/ResetPasswordSeller';
import UserInfoComponent from './components/Info/UserInfoComponent'; // Import the new component

import AddUserInfoComponent from "./components/Info/AddUserInfoComponent";
import UpdateUserInfoComponent from "./components/Info/UpdateUserInfoComponent";
import { useDispatch } from 'react-redux';

import RegisterUserInfo from './components/User/RegisterUserInfo';
import ProfileUserInfo from './components/User/ProfileUserInfo';
import UpdateUserInfo from './components/User/UpdateUserInfo';

import ProfileSellerInfo from './components/User/ProfileSellerInfo';
import UpdateSellerInfo from './components/User/UpdateSellerInfo';
import Send2FA from './components/User/Send2FA';
import Verify2FA from './components/User/Verify2FA';
import Send2FASeller from './components/User/Send2FASeller';
import Verify2FASeller from './components/User/Verify2FASeller';



function App() {

  const dispatch = useDispatch();
  // Load user and seller data on app mount
  useEffect(() => {
    store.dispatch(loaduser());
  }, [dispatch]);

  

  useEffect(() => {
    store.dispatch(loadSeller());
  }, [dispatch]);

  

  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer />
          <Routes>
            {/* Home */}
            <Route path="/home" element={<Home />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/loginSeller" element={<LoginSeller />} />

            {/* Register */}
            <Route path="/register" element={<Register />} />
            <Route path="/registerSeller" element={<RegisterSeller />} />




            <Route path="/registerUserInfo" element={<RegisterUserInfo />} />
            


            {/* Profile */}
            <Route
              path="/myprofile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileseller"
              element={
                <ProtectedRouteSeller>
                  <ProfileSeller />
                </ProtectedRouteSeller>
              }
            />

            {/* Update Profile */}
            <Route
              path="/myprofile/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profileseller/update"
              element={
                <ProtectedRouteSeller>
                  <UpdateProfileSeller />
                </ProtectedRouteSeller>
              }
            />

            {/* Update Password */}
            <Route
              path="/myprofile/update/password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myprofile/update/passwordSeller"
              element={
                <ProtectedRouteSeller>
                  <UpdatePasswordSeller />
                </ProtectedRouteSeller>
              }
            />

            {/* Forgot Password */}
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/forgotSeller" element={<ForgotPasswordSeller />} />

            {/* Reset Password */}
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/password/resetSeller/:token" element={<ResetPasswordSeller />} />

            {/* User Info */}
            <Route
              path="/user-info"
              element={
                <ProtectedRoute>
                  <UserInfoComponent />
                </ProtectedRoute>
              }
            />

            
            {/* User Info */}
            <Route
              path="/userInfoProfile"
              element={
                <ProtectedRoute>
                  <ProfileUserInfo />
                  </ProtectedRoute>
              }
            />



              <Route
              path="/sellerInfoProfile"
              element={
                <ProtectedRouteSeller>
                  <ProfileSellerInfo />
                  </ProtectedRouteSeller>
              }
            />

            <Route
              path="/updateSellerInfo"
              element={
                <ProtectedRouteSeller>
                  <UpdateSellerInfo />
                  </ProtectedRouteSeller>
              }
            />

               {/* User Info */}
               <Route
              path="/updateUserInfo"
              element={
                <ProtectedRoute>
                  <UpdateUserInfo />
                  </ProtectedRoute>
              }
            />


          <Route path="/send2fa" element={<Send2FA />} />
          <Route path="/verify2fa" element={<Verify2FA />} />

          <Route path="/send2faSeller" element={<Send2FASeller />} />
          <Route path="/verify2faSeller" element={<Verify2FASeller />} />



          <Route path="/add-user-info" element={<AddUserInfoComponent />} />
          <Route path="/update-user-info" element={<UpdateUserInfoComponent />} />
          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;