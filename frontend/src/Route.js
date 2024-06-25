import React from "react";
import { Routes, Route } from "react-router-dom";
import * as Container from "./containers";
import PrivateComponent from "./containers/PrivateComponent";

const RouteWrapper = () => {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/" element={<Container.Signup />} />
          <Route path="/login" element={<Container.Login />} />
          <Route path="/change-password" element={<Container.Password />} />
        </>
      ) : (
        <Route element={<PrivateComponent />}>
          <Route path="/home" element={<Container.Home />} />
          <Route path="/upload" element={<Container.UploadPost />} />
          <Route path="/profile" element={<Container.Profile />} />
          <Route path="/updateprofile" element={<Container.UpdateProfile />} />

          <Route path="/polaris" element={<Container.Polaris />} />
        </Route>
      )}
    </Routes>
  );
};

export default RouteWrapper;
