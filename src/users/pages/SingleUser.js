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

  console.log("user id " + userId);
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
  if (user) {
    console.log("umage url " + user.imageUrl);
  }
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
          imageUrl={user.imageUrl}
          name={user.name}
          countOfPosts={user.posts.length}
        />
      )}
    </React.Fragment>
  );
};
export default SingleUser;
