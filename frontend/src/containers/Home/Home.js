import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Home/Home";
import "./Home.css";
import {
  fetchPostsRequest,
  likePostRequest,
  unlikePostRequest,
} from "../../ducks/Home";
import { fetchLikesRequest } from "../../ducks/Like";
import {
  commentPostRequest,
  fetchCommentsForPostRequest,
} from "../../ducks/Comment";
import { fetchSingleCommentRequest } from "../../ducks/SingleComment";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.home);
  const { likes, likesCount } = useSelector((state) => state.likes);
  const { comments, commentsCount } = useSelector((state) => state.comment);
  const { comment } = useSelector((state) => state.singlecomment);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const initialPage = parseInt(localStorage.getItem("page"), 10) || 1;
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchPostsRequest(page, limit));
  }, [dispatch, page, limit]);

  useEffect(() => {
    setHasMore(posts.length === limit);
  }, [posts, limit]);

  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const [loadedPosts, setLoadedPosts] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setLoadedPosts(posts);
  }, [posts]);

  const handleLike = (postId) => {
    dispatch(likePostRequest(userId, postId));
  };

  const handleUnlike = (postId) => {
    dispatch(unlikePostRequest(userId, postId));
  };

  const fetchlikes = (postId) => {
    dispatch(fetchLikesRequest(postId));
  };

  const commentPost = (postId, userId, text) => {
    dispatch(commentPostRequest(postId, userId, text));
  };

  const fetchcomment = (postId) => {
    dispatch(fetchCommentsForPostRequest(postId));
  };

  const editcomment = (commentId) => {
    dispatch(fetchSingleCommentRequest(commentId));
    setActiveEdit(true);
  };

  useEffect(() => {
    if (comment) {
      setText(comment.text);
    }
  }, [comment]);

  const handleInputChange = (value) => {
    setText(value);
  };

  const handleChangeEdit = () => setActiveEdit(!activeEdit);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {loadedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          userId={userId}
          onLike={handleLike}
          onUnlike={handleUnlike}
          likes={likes}
          fetchlikes={fetchlikes}
          commentPost={commentPost}
          fetchcomment={fetchcomment}
          comments={comments}
          editcomment={editcomment}
          comment={comment}
          text={text}
          handleChangeEdit={handleChangeEdit}
          handleInputChange={handleInputChange}
          activeEdit={activeEdit}
          likesCount={likesCount[post._id]}
          commentsCount={commentsCount}
        />
      ))}
      <div className="buttons">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={!hasMore}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
