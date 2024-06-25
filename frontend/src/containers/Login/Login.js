import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginComponent from "../../components/Login/Login";
import { loginRequest } from "../../ducks/Login";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigate("/home");
    }
  }, [navigate, user]);

  const handleLogin = () => {
    dispatch(loginRequest({ email, password }));
  };

  useEffect(() => {
    if (user) {
      // User is logged in, reload the page to refresh the state
      window.location.reload();
    }
  }, [user]);

  return (
    <LoginComponent
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      loading={loading}
      error={error}
    />
  );
};

export default LoginContainer;
