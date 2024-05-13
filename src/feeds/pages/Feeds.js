import React, { useEffect, useState } from "react";

import FeedsList from "../components/FeedsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
const FEEDS = [
  {
    id: "f1",
    title: "First feed",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    content: "Some content",
    author: "Max Schwarz",
    authorId: "u1",
    date: "23 May 2023",
  },
  {
    id: "f2",
    title: "Another feeds",
    image: "https://avatars.githubusercontent.com/u/45769545?v=4",
    content: "Some content",
    author: "Math Mathias",
    authorId: "u2",
    date: "28 May 2023",
  },
  {
    id: "f3",
    title: "Third feeds",
    image: "https://avatars.githubusercontent.com/u/45769545?v=4",
    content: "Some content",
    author: "Math Mathias",
    authorId: "u2",
    date: "10 May 2023",
  },
];
const Feeds = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeeds, setLoadedFeeds] = useState();

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
    if (!loadedFeeds) {
      setLoadedFeeds(FEEDS);
    }
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

export default Feeds;
