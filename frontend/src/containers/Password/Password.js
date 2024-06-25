// src/containers/ChangePasswordContainer.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest } from "../../ducks/Password";
import { useNavigate } from "react-router-dom";
import ChangePasswordComponent from "../../components/Password/Password";

const ChangePasswordContainer = () => {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, error } = useSelector(
    (state) => state.changePassword
  );

  const handleChangePassword = (e) => {
    e.preventDefault();

    if (oldPassword === newPassword) {
      alert("New password must be different from the old password.");
      return;
    }

    dispatch(changePasswordRequest({ email, oldPassword, newPassword }));
  };

  useEffect(() => {
    if (message) {
      navigate("/login");
    }
  }, [message, navigate]);

  return (
    <ChangePasswordComponent
      email={email}
      setEmail={setEmail}
      oldPassword={oldPassword}
      setOldPassword={setOldPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      handleChangePassword={handleChangePassword}
      loading={loading}
      message={message}
      error={error}
    />
  );
};

export default ChangePasswordContainer;
