import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleUserItem from "../components/SingleUserItem";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook.js";

const SingleUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/" + userId
        );

        setUser(responseData.user);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest, userId]);
  console.log("here is user" + user);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && user && (
        <SingleUserItem
          className="center"
          key={user.id}
          id={user.id}
          image={user.imageUrl}
          name={user.name}
          countOfPosts={user.posts.length}
        />
      )}
    </React.Fragment>
  );
};
export default SingleUser;
