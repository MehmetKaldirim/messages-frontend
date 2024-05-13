import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import FeedsList from "../components/FeedsList";
import Card from "../../shared/components/UIElements/Card";

import { useHttpClient } from "../../shared/hooks/http-hook";

const MyFeeds = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeeds, setLoadedFeeds] = useState();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        console.log("buraya ulasmiyor");
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/feeds/user/${userId}`
        );
        console.log(responseData);
        setLoadedFeeds(responseData.posts);
      } catch (err) {}
    };
    fetchFeeds();
  }, [sendRequest, userId]);
  console.log("my feeds" + loadedFeeds);

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
        <div className="place-list center">
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/feeds/new">Share Place</Button>
          </Card>
        </div>
      )}
    </>
  );
};
export default MyFeeds;
