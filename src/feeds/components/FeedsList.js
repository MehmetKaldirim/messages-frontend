import React from "react";

import FeedItem from "./FeedItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./FeedsList.css";
const FeedsList = (props) => {
  if (props.items.length === 0 || !props.items) {
    console.log("here no items" + props.items);
    return (
      <div className="post-list center">
        <Card>
          <h2>No post found. Maybe create one?</h2>
          <Button to="/feeds/new">Share Post</Button>
        </Card>
      </div>
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
