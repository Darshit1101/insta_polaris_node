import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../ducks/Navbar";
import { updateUserRequest } from "../../ducks/UpdateProfile";
import { useNavigate } from "react-router-dom";
import UpdateProfileComponent from "../../components/UpdateProfile/UpdateProfile";
import { updateUserWithImageRequest } from "../../ducks/UserImage";
import { updateUserWithoutImageRequest } from "../../ducks/UserwithoutImg";

const UpdateProfile = () => {
  const auth = localStorage.getItem("user");
  const userId = auth ? JSON.parse(auth)._id : null;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRequest(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.Photo);
    }
  }, [user]);

  // const handleUpdate = () => {
  //   dispatch(updateUserRequest({ userId, name, email, Photo: photo }));
  // };
  const handleUpdate = () => {
    if (photo instanceof File) {
      // If a file (photo) is selected, dispatch update with image request
      dispatch(
        updateUserWithImageRequest({ userId, name, email, Photo: photo })
      );
    } else {
      // If no file (photo) is selected, dispatch update without image request
      dispatch(updateUserWithoutImageRequest({ userId, name, email }));
    }
  };

  return (
    <UpdateProfileComponent
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      photo={photo}
      setPhoto={setPhoto}
      handleUpdate={handleUpdate}
    />
  );
};

export default UpdateProfile;
