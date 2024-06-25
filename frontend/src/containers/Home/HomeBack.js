import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Home/Home";
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
import debounce from "lodash/debounce";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

  const { posts, loading, error } = useSelector((state) => state.home);
  const { likes, likesCount } = useSelector((state) => state.likes);
  const { comments, commentsCount } = useSelector((state) => state.comment);
  const { comment } = useSelector((state) => state.singlecomment);
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const [loadedPosts, setLoadedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [activeEdit, setActiveEdit] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (posts.length > 0) {
      const initialPosts = posts.slice(0, 3);
      setLoadedPosts(initialPosts);
    }
  }, [posts]);

  const loadMorePosts = useCallback(() => {
    if (!hasMore) return;

    const currentLoadedCount = loadedPosts.length;
    const nextPosts = posts.slice(currentLoadedCount, currentLoadedCount + 3);

    if (nextPosts.length > 0) {
      setLoadedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    }

    if (nextPosts.length < 3) {
      setHasMore(false);
    }
  }, [loadedPosts, posts, hasMore]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        loadMorePosts();
      }
    }, 200),
    [loadMorePosts]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const handleChangeEdit = useCallback(
    () => setActiveEdit(!activeEdit),
    [activeEdit]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {loadedPosts.map(
        (post) => (
          console.log("post====>", post),
          (
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
          )
        )
      )}
      {hasMore && <p>Loading more posts...</p>}
    </div>
  );
};

export default Home;
