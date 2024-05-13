import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../../shared/components/UIElements/Modal";
import Image from "../../shared/components/UIElements/Image";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./FeedItem.css";
const FeedItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/feeds/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
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
        {isLoading && <LoadingSpinner asOverlay />}
        <h1>{props.title}</h1>
        <h2>
          <Link to={`/feeds/users/${props.authorId}`}>{props.author} </Link>
          {props.date}
        </h2>
        <div className="single-post__image">
          <Image
            contain
            imageUrl={`${process.env.REACT_APP_ASSET_URL}${props.image}`}
          />
        </div>
        <p>{props.content}</p>
        <div className="post-item__action">
          {auth.userId === props.creatorId && (
            <Button to={`/feeds/posts/${props.id}`}>EDIT</Button>
          )}
          {auth.userId === props.creatorId && (
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
