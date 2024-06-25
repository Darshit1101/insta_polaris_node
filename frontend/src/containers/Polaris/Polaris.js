import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByCommentTextRequest } from "../../ducks/Home";
import "./Polaris.css";
import { Card, InlineStack, Box, Text } from "@shopify/polaris";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.home);
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchPostsByCommentTextRequest(searchKey));
  };

  useEffect(() => {
    if (searchKey) {
      dispatch(fetchPostsByCommentTextRequest(searchKey));
    }
  }, [dispatch, searchKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Search by comment text"
        />
        <button type="submit">Search</button>
      </form>
      <InlineStack align="center">
        <Box maxWidth="40%" padding={100}>
          <Card>
            {posts.map((post) => (
              <div key={post._id}>
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
              </div>
            ))}
          </Card>
        </Box>
      </InlineStack>
    </div>
  );
};

export default PostList;
