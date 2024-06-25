import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupComponent from "../../components/SignUp/Signup";
import { signupRequest } from "../../ducks/Signup";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);

  useEffect(() => {
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const inputHandler = (value, name) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const collectData = () => {
    const { name, email, password, image } = user;
    if (!name || !email || !password || !image) {
      alert("All fields are required");
      return;
    }

    dispatch(signupRequest(user));
  };

  return (
    <SignupComponent
      user={user}
      inputHandler={inputHandler}
      collectData={collectData}
      loading={loading}
      error={error}
    />
  );
};

export default Signup;
