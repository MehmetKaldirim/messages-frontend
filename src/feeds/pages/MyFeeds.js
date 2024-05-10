import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FeedsList from "../components/FeedsList";
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
const MyFeeds = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedFeeds, setLoadedFeeds] = useState();

  const userId = useParams().userId;
  const loadedPosts = FEEDS.filter((post) => post.authorId === userId);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/posts"
        );
        setLoadedFeeds(responseData.feeds);
      } catch (err) {}
    };
    fetchFeeds();
    if (!loadedFeeds) {
      setLoadedFeeds(loadedPosts);
    }
    console.log(loadedFeeds);
  }, [sendRequest]);

  return <>{!isLoading && loadedFeeds && <FeedsList items={loadedFeeds} />}</>;
};

export default MyFeeds;
