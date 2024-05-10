import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./PostForm.css";

const FEEDS = [
  {
    id: "f1",
    title: "First feed",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    content: "Some content",
    author: "Max Schwarz",
    authorId: "u1",
    date: "23 May 2023",
  },
  {
    id: "f2",
    title: "Another feeds",
    image: "https://avatars.githubusercontent.com/u/45769545?v=4",
    content: "Some content",
    author: "Math Mathias",
    authorId: "u2",
    date: "28 May 2023",
  },
];

const UpdatePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const postId = useParams().postId;

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

  const identifiedPost = FEEDS.find((p) => p.id === postId);
  console.log("here identifiedPost=  " + identifiedPost.title);

  useEffect(() => {
    setFormData(
      {
        title: {
          value: identifiedPost.title,
          isValid: true,
        },
        content: {
          value: identifiedPost.content,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, identifiedPost]);

  const postUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPost) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className="post-form" onSubmit={postUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="content"
        element="textarea"
        type="text"
        label="Content"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid conten , at least five character"
        onInput={inputHandler}
        initialValue={formState.inputs.content.value}
        initialValid={formState.inputs.content.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE POST
      </Button>
    </form>
  );
};

export default UpdatePost;
