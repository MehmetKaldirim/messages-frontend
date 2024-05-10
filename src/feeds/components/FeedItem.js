import React from "react";
import { Link } from "react-router-dom";

import Image from "../../shared/components/UIElements/Image";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import "./FeedItem.css";
const FeedItem = (props) => {
  //const date = new Date(props.).toLocaleDateString("en-US");
  return (
    <Card className="single-post">
      <h1>{props.title}</h1>
      <h2>
        Created by <Link to={`/${props.authorId}`}>{props.author} </Link> on{" "}
        {props.date}
      </h2>
      <div className="single-post__image">
        <Image contain imageUrl={props.image} />
      </div>
      <p>{props.content}</p>
      <div className="post-item__action">
        <Button to={`/feeds/${props.id}`}>EDIT</Button>
        <Button danger>DELETE</Button>
      </div>
    </Card>
  );
};

export default FeedItem;
