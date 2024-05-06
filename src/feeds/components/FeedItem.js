import React from "react";
import { Link } from "react-router-dom";

import Image from "../../shared/components/UIElements/Image";
import Card from "../../shared/components/UIElements/Card";
import "./FeedItem.css";
const FeedItem = (props) => {
  //const date = new Date(props.).toLocaleDateString("en-US");
  return (
    <Card className="single-post">
      <h1>{props.title}</h1>
      <h2>
        Created by <Link to={`/${props.authorId}/feeds`}>{props.author} </Link>{" "}
        on {props.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={props.image} />
      </div>
      <p>{props.content}</p>
    </Card>
  );
};

export default FeedItem;
