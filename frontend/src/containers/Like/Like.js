// src/components/LikesComponent.js

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLikesRequest } from "../../ducks/Like";
import { useParams } from "react-router-dom";

const LikesComponent = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { likes, loading, error } = useSelector((state) => state.likes);

  useEffect(() => {
    dispatch(fetchLikesRequest(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Likes</h3>
      {likes && likes.length > 0 ? (
        likes.map((like, index) => (
          <div key={index}>
            <p>{like.name}</p>
            <img src={like.Photo} alt={like.name} />
          </div>
        ))
      ) : (
        <p>No likes found</p>
      )}
    </div>
  );
};

export default LikesComponent;
