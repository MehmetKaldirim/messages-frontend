import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PostForm.css";

const NewPost = () => {
  const [formState, inputHandler] = useForm(
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

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className="post-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="content"
        element="textarea"
        type="text"
        label="Content"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid conten , at least five character"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD POST
      </Button>
    </form>
  );
};

export default NewPost;
