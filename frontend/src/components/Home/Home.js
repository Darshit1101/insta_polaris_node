import React, { useState, useEffect, useCallback } from "react";
import "./HomeCard.css";
import { SendIcon, HeartIcon, ThumbsUpIcon } from "@shopify/polaris-icons";
import {
  fetchPostsRequest,
  likePostRequest,
  unlikePostRequest,
} from "../../ducks/Home";
import {
  Card,
  Icon,
  Button,
  Collapsible,
  TextContainer,
  Link,
  InlineStack,
  Box,
  TextField,
  Text,
  Modal,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentRequest } from "../../ducks/SingleComment";
const Home = ({
  post,
  onLike,
  onUnlike,
  likes,
  fetchlikes,
  commentPost,
  userId,
  comments,
  fetchcomment,
  editcomment,
  comment,
  text,
  handleChangeEdit,
  handleInputChange,
  activeEdit,
  likesCount,
  commentsCount,
}) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(post.likes?.includes(userId));
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);

  const handleLikeUnlike = () => {
    if (isLiked) {
      dispatch(unlikePostRequest(userId, post._id));
      // fetchlikes(post._id);
      setLikeCount(likeCount - 1);
    } else {
      dispatch(likePostRequest(userId, post._id));
      // fetchlikes(post._id);
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // like modal
  const [likeactive, setActive] = useState(false);
  const likehandleChange = useCallback(
    () => setActive(!likeactive),
    [likeactive]
  );

  const likeactivator = (
    <div
      className="like-count"
      onClick={() => {
        likehandleChange();
        fetchlikes(post._id);
      }}
    >
      likes {likeCount}
      {/* likes {likesCount} */}
    </div>
  );
  // comment post
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentPost(post._id, userId, commentText);
    setCommentText("");
    setCommentCount(commentCount + 1);
  };
  // comment modal
  const [activecomment, setActivecomment] = useState(false);

  const handlecomment = useCallback(
    () => setActivecomment(!activecomment),
    [activecomment]
  );

  const activatorcomment = (
    <div
      className="view-comment"
      onClick={() => {
        handlecomment();
        fetchcomment(post._id);
      }}
    >
      View all comments... ({commentCount})
    </div>
  );

  // edit comment
  const handleUpdateComment = () => {
    dispatch(updateCommentRequest(comment._id, text));
    fetchcomment(post._id);
    handleChangeEdit();
  };
  //heart

  return (
    <div>
      <InlineStack align="center">
        <Box maxWidth="40%" padding={100}>
          <Card>
            <InlineStack align="center" spacing="tight">
              <Box
                width="30px"
                height="30px"
                borderRadius="50%"
                overflow="hidden"
              >
                <div className="avatar-container">
                  <img
                    src={post.postedBy?.Photo}
                    alt="User"
                    className="avatar"
                  />
                </div>
              </Box>
              <Text variant="headingMd" as="h6">
                {post.postedBy?.name}
              </Text>
            </InlineStack>
            <div className="container">
              <div className="card">
                <img src={post.Photo} className="postImg" alt="Post" />
              </div>
            </div>
            <div className="card-body">
              {/* <Button onClick={handleLikeUnlike}>
                <Icon source={ThumbsUpIcon} tone="base" />
              </Button> */}
              <div className="favorite">
                <span
                  onClick={handleLikeUnlike}
                  className={`material-symbols-outlined ${
                    isLiked ? "material-symbols-outlined-red" : ""
                  }`}
                >
                  favorite
                </span>
              </div>

              {/* like modal  */}
              <Modal
                activator={likeactivator}
                open={likeactive}
                title="User Likes"
                onClose={likehandleChange}
              >
                <p className="likeCount">Likes: {likesCount}</p>

                {likes && likes.length > 0 ? (
                  likes.map((like, index) => (
                    <Modal.Section key={index}>
                      <TextContainer>
                        <li className="likeli">
                          <span>{index + 1}. </span>
                          {like.Photo && (
                            <img
                              width="30"
                              height="30"
                              className="likeProfile"
                              src={like.Photo}
                              alt={like.name}
                            />
                          )}
                          <span className="mx-2">{like.name}</span>
                        </li>
                      </TextContainer>
                    </Modal.Section>
                  ))
                ) : (
                  <TextContainer>
                    <p>No likes found</p>
                  </TextContainer>
                )}
              </Modal>
              {/* caption  */}
              <Box padding={200} paddingInlineStart="400">
                <p className="captionText">{post.body}</p>
              </Box>
              <InlineStack align="center" spacing="tight">
                <Box minWidth="80%">
                  <TextField
                    value={commentText}
                    onChange={(value) => setCommentText(value)}
                    placeholder="Add a comment..."
                    type="text"
                    multiline
                  />
                </Box>
                <Box paddingInlineStart="600">
                  <Button onClick={handleCommentSubmit}>
                    <Icon source={SendIcon} tone="base" />
                  </Button>
                </Box>
              </InlineStack>
              {/* comment  */}
              <Modal
                activator={activatorcomment}
                open={activecomment}
                title="Comments list"
                onClose={handlecomment}
              >
                <TextContainer>
                  <p>commentsCount:-({commentsCount})</p>
                  {comments && comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <Modal.Section key={comment._id}>
                        <div className="modal-comment-item">
                          <span>{index + 1}. </span>
                          <img
                            height={30}
                            width={30}
                            src={comment.user.Photo}
                            alt={comment.user.name}
                          />
                          <Text variant="headingMd" as="h6">
                            {comment.user.name}
                          </Text>
                          <span className="material-symbols-outlined">
                            arrow_right_alt
                          </span>
                          <Text variant="headingMd" as="h6">
                            {comment.text}
                          </Text>
                          <span
                            onClick={() => {
                              editcomment(comment._id);
                              handleChangeEdit();
                              handlecomment();
                            }}
                            className="material-symbols-outlined editIcon"
                          >
                            edit
                          </span>
                        </div>
                      </Modal.Section>
                    ))
                  ) : (
                    <p>No comments available</p>
                  )}
                </TextContainer>
              </Modal>
              {/* edit comment */}
              <Modal
                open={activeEdit}
                onClose={handleChangeEdit}
                title="Edit Comment"
                primaryAction={{
                  content: "Save",
                  onAction: handleUpdateComment,
                }}
              >
                <Modal.Section>
                  <TextContainer>
                    <TextField
                      value={text}
                      onChange={handleInputChange}
                      label="Comment"
                    />
                  </TextContainer>
                </Modal.Section>
              </Modal>
            </div>
          </Card>
        </Box>
      </InlineStack>
    </div>
  );
};

export default Home;
