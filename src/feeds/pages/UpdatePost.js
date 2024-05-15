import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./PostForm.css";

const UpdatePost = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const postId = useParams().postId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      content: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5001/api/feeds/post/${postId}`
        );
        setLoadedPost(responseData.post);
        setFormData(
          {
            title: {
              value: responseData.post.title,
              isValid: true,
            },
            content: {
              value: responseData.place.content,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, postId, setFormData]);

  const postUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5001/api/feeds/${postId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          content: formState.inputs.content.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push("/" + auth.userId + "/posts");
    } catch (err) {}
  };

  if (!loadedPost && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find post!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPost && (
        <form className="post-form" onSubmit={postUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPost.title}
            initialValid={true}
          />
          <Input
            id="content"
            element="textarea"
            label="Content"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPost.content}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE POST
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePost;
