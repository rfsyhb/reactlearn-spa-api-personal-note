// Cari tau dulu whats needed
/*
* CreatePage
  - Form Input
  - state
  - onChange handler
  - add to API
  - navigate
*/
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import React from "react";
import * as NetworkData from "../api/network-data";
import NoteCreate from "../components/NoteCreate";

function CreatePage() {
  const navigate = useNavigate();
  // umum: state dan event.target
  const [title, onTitleChangeHandler] = useInput("");

  // bukan useInput karena sebuah div 'contentEditable'
  const [body, setBody] = React.useState("");

  // functions
  function onBodyChangeHandler(event) {
    setBody(event.target.innerHTML);
  }

  async function onSubmitFormHandler(event) {
    event.preventDefault();

    await NetworkData.addNote({ title, body });
    navigate("/");
  }

  return (
    <NoteCreate
      title={title}
      onTitleChange={onTitleChangeHandler}
      onBodyChange={onBodyChangeHandler}
      onSubmit={onSubmitFormHandler}
    />
  );
}

export default CreatePage;
