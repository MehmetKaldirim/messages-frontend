import React, { useContext, useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import "./UserItem.css";

const UserItem = (props) => {
  const [showUser, setShowUser] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showUserHandler = () => setShowUser(true);
  const closeUserHandler = () => setShowUser(false);

  //<h2>THE MAP!</h2>
  return (
    <>
      <Modal
        show={showUser}
        onCancel={closeUserHandler}
        header={props.name}
        contentClass="user-item__model-content"
        footerClass="user-item__modal-actions"
        footer={<Button onClick={closeUserHandler}>CLOSE</Button>}
      ></Modal>

      <li className="user-item">
        <Card className="user-item__content">
          <div className="user-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>{props.countOfMessages}</h3>
          </div>
        </Card>
      </li>
    </>
  );
};

export default UserItem;
