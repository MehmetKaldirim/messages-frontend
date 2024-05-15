import React, { useEffect, useState, useContext } from "react";

import FeedsList from "../components/FeedsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Feeds = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeeds, setLoadedFeeds] = useState();
  const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/feeds/posts`
        );
        console.log(responseData);
        setLoadedFeeds(responseData.posts);
      } catch (err) {}
    };
    fetchFeeds();
  }, [sendRequest]);
  console.log(loadedFeeds);

  const postDeletedHandler = (deletedPostId) => {
    setLoadedFeeds((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedFeeds && (
        <FeedsList items={loadedFeeds} onDeletePost={postDeletedHandler} />
      )}
      {!loadedFeeds && (
        <div className="post-list center">
          <Card>
            <h2>No posts found. Maybe create one?</h2>
            <Button to="/feeds/new">Share Place</Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Feeds;
