import { useNavigate } from "react-router-dom";
import { addNote } from "../utils/network-data";
import NoteCreate from "../components/NoteCreate";
import useInput from "../hooks/useInput";

function CreatePage() {
  const navigate = useNavigate();
  const [title, onTitleChangeHandler] = useInput("");
  const [body, onBodyChangeHandler] = useInput("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    await addNote({ title, body });
    navigate("/");
  };

  return (
    <NoteCreate
      title={title}
      onTitleChange={onTitleChangeHandler}
      onBodyChange={onBodyChangeHandler}
      onSubmit={onSubmitHandler}
    />
  );
}

export default CreatePage;
