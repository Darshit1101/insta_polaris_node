import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uploadPostRequest } from "../../ducks/UploadPost"; // updated path
import UploadPostComponent from "../../components/UploadPost/UploadPost";

const UploadPostContainer = () => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);
  const { loading, error } = postState;

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      console.error("No image selected");
      return;
    }
    dispatch(uploadPostRequest({ body, image, userId }));
  };

  if (postState.post) {
    navigate("/home");
  }

  return (
    <UploadPostComponent
      body={body}
      setBody={setBody}
      setImage={setImage}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default UploadPostContainer;
