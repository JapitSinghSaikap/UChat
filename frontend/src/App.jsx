import { useEffect, useState } from 'react'
import  Navbar  from './components/navbar'
import {Routes,Route} from "react-router-dom"
import  HomePage  from './pages/homepage'
import LoginPage from './pages/loginpage'
import ProfilePage from './pages/profilepage'
// import { SettingsPage } from './pages/settings'
import  SignUpPage  from './pages/signup'
import { authCheck } from './store/authCheck'
import {Loader} from "lucide-react";
import { Navigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';


function App() {
  const { authUser, checkAuth, isCheckingAuth } = authCheck();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Toaster position="top-center" className="h-5" reverseOrder={false} />
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
