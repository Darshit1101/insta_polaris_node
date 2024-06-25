import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByCommentTextRequest } from "../../ducks/Home";
import { Card, InlineStack, Box, Text } from "@shopify/polaris";
import Home from "../../containers/Home/Home";

const PostList = ({ searchKey }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchKey) {
      dispatch(fetchPostsByCommentTextRequest(searchKey));
    }
  }, [dispatch, searchKey]);

  return (
    <div>
      <Home />
    </div>
  );
};

export default PostList;
