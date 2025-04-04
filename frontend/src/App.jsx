import React, { useEffect } from 'react'
import { Navbar, Home, Login, Profile, Setting, Signup } from './index.js'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from './store/userSlice.js'
import axiosInstance from './axiosConfig.js'
import { toastHanlder } from './store/services/toastHandler.jsx'

const App = () => {
  const dispatch = useDispatch();

  const getData = async () => {
    const res = axiosInstance.get("/auth/user-data");
    const response = toastHanlder(res, "Success", "Error", "Loading");
    if (response.data && response.data.data) dispatch(setUserData(response.data?.data));
    else dispatch(setUserData(null));
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App