import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

const UserItem = (props) => {
  console.log("user item " + props.image);
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/feeds/${props.id}/posts`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}${props.image}`}
              alt={props.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.countOfPosts} {props.countOfPosts === 1 ? "Post" : "Posts"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
