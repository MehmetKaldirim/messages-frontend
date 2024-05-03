import React from "react";

import FeedItem from "./FeedItem";
import "./FeedsList.css";
const FeedsList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No feeds found</h2>
      </div>
    );
  }

  return (
    <ul className="feeds-list">
      {props.items.map((feed) => (
        <FeedItem
          key={feed.id}
          id={feed.id}
          image={feed.image}
          title={feed.title}
          content={feed.content}
          author={feed.author}
          date={feed.date}
        />
      ))}
    </ul>
  );
};

export default FeedsList;
