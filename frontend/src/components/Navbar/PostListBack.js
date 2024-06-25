import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByCommentTextRequest } from "../../ducks/Home";
import { Card, InlineStack, Box, Text } from "@shopify/polaris";
import Home from "../../containers/Home/Home";

const PostList = ({ searchKey }) => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.home);

  useEffect(() => {
    if (searchKey) {
      dispatch(fetchPostsByCommentTextRequest(searchKey));
    }
  }, [dispatch, searchKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <InlineStack align="center">
        <Box maxWidth="50%" padding={100}>
          {posts.length === 0 ? (
            <Card>
              <Text variant="bodyMd">Comments on posts are not available.</Text>
            </Card>
          ) : (
            posts.map((post) => (
              <Card
                key={post._id}
                sectioned
                paddingBlockStart={400}
                paddingBlockEnd={400}
              >
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
                <h2>{post.body}</h2>
              </Card>
            ))
          )}
        </Box>
      </InlineStack>
    </div>
  );
};

export default PostList;
