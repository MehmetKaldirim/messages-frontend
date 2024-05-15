import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import FeedsList from "../components/FeedsList";

import { useHttpClient } from "../../shared/hooks/http-hook";

const MyFeeds = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeeds, setLoadedFeeds] = useState();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/feeds/user/${userId}`
        );
        setLoadedFeeds(responseData.posts);
      } catch (err) {}
    };
    fetchFeeds();
  }, [sendRequest, userId]);

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
    </>
  );
};
export default MyFeeds;
