import React, { useState, useEffect } from "react";
import axios from "axios";
import supabase from "../client.js";
import useNavigate from 'react-router-dom'
import '../.env'

const API_URL = "http://localhost:3000"; 
const App = () => {
  const [formData, setFormData] = useState({ email: "", password: "", fullname: "" });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) setUser(data.user);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SIGN UP
  const handleSignUp = async () => {
    try {
      const { data } = await axios.post(`${REACT_APP_SERVER_BASEAPI}/signup`, formData);
      setUser(data.user);
      // navigate(
      //   "/"
      // )
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  // LOGIN
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${REACT_APP_SERVER_BASEAPI}/login`, formData);
      setUser(data.user);
      // navigate(
      //   "/"
      // )
    } catch (err) {
      console.error(err.response.data.error);
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    await axios.post(`${REACT_APP_SERVER_BASEAPI}/logout`);
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!user ? (
        <>
          <input name="fullname" placeholder="Full Name" onChange={handleChange} />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h3>Welcome, {user.email}</h3>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default App;
