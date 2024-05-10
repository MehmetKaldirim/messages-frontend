import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleUserItem from "../components/SingleUserItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import Card from "../../shared/components/UIElements/Card.js";

const USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    email: "test@test.com",
    countOfPosts: 3,
  },
  {
    id: "u2",
    name: "Math mathias",
    image: "https://avatars.githubusercontent.com/u/45769545?v=4",
    email: "test1@test.com",
    countOfPosts: 3,
  },
];

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  const identifiedUser = USERS.find((u) => u.id === userId);
  console.log(identifiedUser.name);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      <SingleUserItem
        className="center"
        key={identifiedUser.id}
        id={identifiedUser.id}
        image={identifiedUser.image}
        name={identifiedUser.name}
        countOfPosts={identifiedUser.countOfPosts}
      />
    </React.Fragment>
  );
};
export default Users;
