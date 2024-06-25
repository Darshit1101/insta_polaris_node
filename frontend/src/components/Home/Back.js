import React, { useState, useEffect, useCallback } from "react";
import "./HomeCard.css";
import {
  Card,
  Icon,
  LegacyCard,
  LegacyStack,
  Button,
  Collapsible,
  TextContainer,
  Link,
  InlineStack,
  Box,
  TextField,
  Text,
  Frame,
  Avatar,
  Popover,
  ActionList,
  Modal,
} from "@shopify/polaris";

// import "./Home.css";
import { useDispatch } from "react-redux";
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
}) => {
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    if (comment) {
      setText(comment.text);
    }
  }, [comment]);
  const handleInputChange = (newValue) => {
    setText(newValue);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentPost(post._id, userId, commentText);
    setCommentText("");
    fetchcomment(post._id);
  };

  //comment
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleImportedAction = useCallback(
    () => console.log("Imported action"),
    []
  );

  const activator = (
    <InlineStack align="center">
      <Button
        size="large"
        onClick={() => {
          fetchcomment(post._id);
          toggleActive();
        }}
      >
        View all comments....
      </Button>
    </InlineStack>
  );

  //like
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const activatorlike = (
    <InlineStack align="center">
      <Button
        size="large"
        onClick={() => {
          fetchlikes(post._id);
          togglePopoverActive();
        }}
      >
        Likes 🤍
      </Button>
    </InlineStack>
  );

  //comment Collapsible new
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  const [activemodal, setActivemodal] = useState(false);

  const handleChange = useCallback(
    () => setActivemodal((active) => !active),
    []
  );

  const handleSaveComment = () => {
    dispatch(updateCommentRequest(comment._id, text));
    handleChange();
    fetchcomment(post._id);
  };

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
                <Avatar
                  customer
                  source={post.postedBy.Photo}
                  size="small"
                  alt="User"
                />
              </Box>
              <Text variant="headingLg" as="h5">
                {post.postedBy.name}
              </Text>
            </InlineStack>
            <div className="container">
              <div className="card">
                <img src={post.Photo} className="postImg" alt="Post" />
              </div>
            </div>
            <div className="card-body">
              <Box padding={200}>
                <div className="favorite">
                  <span
                    onClick={() => {
                      onLike(post._id);
                    }}
                    className="material-symbols-outlined like"
                  >
                    thumb_up
                  </span>
                  <span
                    onClick={() => {
                      onUnlike(post._id);
                    }}
                    className="material-symbols-outlined dislike"
                  >
                    thumb_down
                  </span>{" "}
                  <Box padding={200}>
                    <Text variant="headingMd" as="h6">
                      Total Likes :- {post.likes.length} Likes
                    </Text>
                  </Box>
                </div>
              </Box>

              {/* like  */}
              <Popover
                active={popoverActive}
                activator={activatorlike}
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
              >
                <Popover.Pane fixed>
                  <Popover.Section>
                    <p>Likes:</p>
                  </Popover.Section>
                </Popover.Pane>
                <Popover.Pane>
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: (
                          <>
                            {likes && likes.length > 0 ? (
                              likes.map((like, index) => (
                                <li
                                  className="d-flex align-items-center mr-3 mt-2"
                                  key={index}
                                >
                                  <span> {index + 1}. </span>
                                  {like.Photo && (
                                    <img
                                      width="30"
                                      height="30"
                                      className="rounded-circle ml-2"
                                      src={like.Photo}
                                      alt={like.name}
                                    />
                                  )}
                                  <span className="mx-2">{like.name}</span>
                                </li>
                              ))
                            ) : (
                              <p>No likes found</p>
                            )}
                          </>
                        ),
                      },
                    ]}
                  />
                </Popover.Pane>
              </Popover>
              {/* caption  */}
              <Box padding={200} paddingInlineStart="400">
                <Text variant="headingMd" as="h6">
                  Caption :-{post.body}
                </Text>
              </Box>
              <InlineStack align="center" spacing="tight">
                <Box maxWidth="70%">
                  <TextField
                    value={commentText}
                    onChange={(value) => setCommentText(value)}
                    placeholder="Add a comment..."
                    type="text"
                    multiline
                  />
                </Box>
                <Box paddingInlineStart="600">
                  <Button size="large" onClick={handleCommentSubmit}>
                    Post
                  </Button>
                </Box>
              </InlineStack>

              <Box padding={300}>
                <Popover
                  active={active}
                  activator={activator}
                  autofocusTarget="first-node"
                  onClose={toggleActive}
                >
                  <ActionList
                    actionRole="menuitem"
                    items={[
                      {
                        content: (
                          <Text variant="headingMd" as="h6">
                            Comments:-({comments.length})
                            {comments.map((comment, index) => (
                              <div key={comment._id}>
                                <div className="d-flex align-items-center">
                                  <span>{index + 1}. </span>
                                  <img
                                    width="30"
                                    height="30"
                                    className="rounded-circle ml-2"
                                    src={comment.user.Photo}
                                    alt={comment.user.name}
                                  />

                                  <Text variant="headingMd" as="h6">
                                    {comment.user.name}➡️
                                  </Text>
                                </div>
                                <Text variant="headingMd" as="h6">
                                  {comment.text}
                                </Text>
                              </div>
                            ))}
                          </Text>
                        ),

                        onAction: handleImportedAction,
                      },
                    ]}
                  />
                </Popover>
              </Box>

              {/* new comment  */}
              <LegacyCard sectioned>
                <LegacyStack vertical>
                  <Button
                    onClick={() => {
                      handleToggle();
                      fetchcomment(post._id);
                    }}
                    ariaExpanded={open}
                    ariaControls="basic-collapsible"
                  >
                    Edit Comments
                  </Button>
                  <Collapsible
                    open={open}
                    id="basic-collapsible"
                    transition={{
                      duration: "500ms",
                      timingFunction: "ease-in-out",
                    }}
                    expandOnPrint
                  >
                    <TextContainer>
                      <Text variant="headingMd" as="h6">
                        Comments:-({comments.length})
                        {comments.map((comment, index) => (
                          <div key={comment._id}>
                            <InlineStack align="center">
                              <span>{index + 1}. </span>
                              <img
                                width="30"
                                height="30"
                                className="rounded-circle ml-2"
                                src={comment.user.Photo}
                                alt={comment.user.name}
                              />

                              <Text variant="headingMd" as="h6">
                                {comment.user.name}➡️
                              </Text>

                              <Text variant="headingMd" as="h6">
                                {comment.text}
                              </Text>
                              <Button
                                onClick={() => {
                                  editcomment(comment._id);
                                  handleChange();
                                }}
                              >
                                Edit
                              </Button>
                            </InlineStack>
                          </div>
                        ))}
                      </Text>
                    </TextContainer>
                  </Collapsible>
                </LegacyStack>
              </LegacyCard>
              {/* modal  */}

              <Modal
                open={activemodal}
                onClose={handleChange}
                title="Your Modal Title"
                primaryAction={{
                  content: "Save",
                  onAction: handleSaveComment,
                }}
              >
                <Modal.Section>
                  <TextField
                    value={text}
                    onChange={handleInputChange}
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                  />
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
