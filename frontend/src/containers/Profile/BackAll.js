import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  TextField,
  InlineStack,
  Button,
  Box,
  Card,
  Modal,
  Frame,
  InlineGrid,
} from "@shopify/polaris";
import {
  fetchPostByIdRequest,
  uploadImageRequest,
  updatePostRequest,
} from "../../ducks/getSinglePost";
import { fetchUserRequest } from "../../ducks/Navbar";
import { fetchPostsRequest } from "../../ducks/Profile";
import { useNavigate } from "react-router-dom";

const Profile = ({ onPostClick }) => {
  const auth = localStorage.getItem("user");
  const userId = auth ? JSON.parse(auth)._id : null;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.profile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRequest(userId));
      dispatch(fetchPostsRequest(userId));
    }
  }, [userId, dispatch]);

  const SpacingBackground = ({ children, width = "100%" }) => {
    return (
      <div
        style={{
          background: "var(--p-color-bg-surface-success)",
          width,
          height: "auto",
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <>
      {user && (
        <InlineStack align="center">
          <Box padding="500">
            <img
              src={user.Photo}
              alt="User Photo"
              style={{ borderRadius: "50%" }}
              width="100"
              height="100"
            />
            <InlineStack align="center">
              <Text variant="headingLg" as="h5">
                {user.name}
              </Text>
            </InlineStack>
          </Box>
        </InlineStack>
      )}

      <SpacingBackground>
        <InlineGrid gap="20px" columns={3}>
          {posts.map((post) => (
            <div className="post-container" key={post._id}>
              <Card>
                <img
                  className="card-img-top profilePost"
                  src={post.Photo}
                  alt={`Post ${post._id}`}
                  onClick={() => onPostClick(post._id)}
                  style={{ width: "100%", cursor: "pointer" }}
                />
              </Card>
            </div>
          ))}
        </InlineGrid>
      </SpacingBackground>
    </>
  );
};

const PostContainer = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { post, loading, error } = useSelector((state) => state.getSinglePost);
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    dispatch(fetchPostByIdRequest(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (post) {
      setBody(post.body);
    }
  }, [post]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(uploadImageRequest(image, postId, body));
    } else {
      dispatch(updatePostRequest(postId, { body, Photo: post.pic }));
    }
    onClose(); // Close the modal after submitting
    navigate("/home");
  };

  const toggleActive = useCallback(() => {
    setActive((active) => !active);
    if (active) {
      onClose();
    }
  }, [onClose, active]);

  return (
    <Frame>
      <Modal
        open={active}
        onClose={toggleActive}
        title="Update Post"
        primaryAction={{
          content: "Share",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: toggleActive,
          },
        ]}
      >
        <Modal.Section>
          <InlineStack align="center">
            <Card>
              <InlineStack align="center">
                <Text variant="headingXl" as="h4">
                  Update Post
                </Text>
              </InlineStack>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <Box padding={300}>
                    <Text variant="headingMd" as="h6">
                      Caption:
                    </Text>
                    <TextField
                      value={body}
                      onChange={setBody}
                      className="btn btn-light"
                      id="caption"
                      name="caption"
                      placeholder="Write a caption..."
                    />
                  </Box>
                </div>
                <div className="form-group">
                  <Box padding={300}>
                    <Text variant="headingMd" as="h6">
                      Select Image:
                    </Text>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {post.pic && (
                      <img
                        src={post.pic}
                        alt="Post"
                        style={{ marginTop: "10px", maxWidth: "100%" }}
                      />
                    )}
                  </Box>
                </div>
              </form>
            </Card>
          </InlineStack>
        </Modal.Section>
      </Modal>
    </Frame>
  );
};

const App = () => {
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
  };

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  return (
    <>
      <Profile onPostClick={handlePostClick} />
      {selectedPostId && (
        <PostContainer postId={selectedPostId} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default App;
