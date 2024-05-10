import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../shared/components/UIElements/Modal";
import Image from "../../shared/components/UIElements/Image";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./FeedItem.css";
const FeedItem = (props) => {
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("delitiyor");
  };
  //const date = new Date(props.).toLocaleDateString("en-US");
  return (
    <>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can`t be undone tehreafter
        </p>
      </Modal>
      <Card className="single-post">
        <h1>{props.title}</h1>
        <h2>
          Created by{" "}
          <Link to={`/feeds/users/${props.authorId}`}>{props.author} </Link> on{" "}
          {props.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={props.image} />
        </div>
        <p>{props.content}</p>
        <div className="post-item__action">
          {auth.isLoggedIn && (
            <Button to={`/feeds/posts/${props.id}`}>EDIT</Button>
          )}
          {auth.isLoggedIn && (
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          )}
        </div>
      </Card>
    </>
  );
};

export default FeedItem;
