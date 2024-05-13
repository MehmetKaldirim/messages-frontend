import React from "react";

import FeedItem from "./FeedItem";
import Card from "../../shared/components/UIElements/Card";
import "./FeedsList.css";
const FeedsList = (props) => {
  if (props.items.length === 0 || !props.items) {
    console.log("here" + props.items);
    return (
      <Card className="center">
        <h2>No feeds found</h2>
      </Card>
    );
  }

  return (
    <ul className="feeds-list">
      {props.items.map((feed) => (
        <FeedItem
          key={feed.id}
          id={feed.id}
          image={feed.imageUrl}
          title={feed.title}
          content={feed.content}
          author={feed.creator}
          creatorId={feed.creator}
          date={feed.createdAt}
          onDelete={props.onDeletePost}
        />
      ))}
    </ul>
  );
};

export default FeedsList;
