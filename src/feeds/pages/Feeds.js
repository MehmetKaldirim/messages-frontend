import React from "react";

import FeedsList from "../components/FeedsList";
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
];
const Feeds = () => {
  return <FeedsList items={FEEDS} />;
};

export default Feeds;
