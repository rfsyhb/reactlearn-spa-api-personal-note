import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as NetworkData from "../api/network-data";
import NoteDetail from "../components/NoteDetail";

function DetailPage() {
  // mengambil id dari URL /notes/:id
  // pastikan useParams()
  const { id } = useParams();

  const navigate = useNavigate();

  // state
  const [note, setNote] = React.useState(null);
  // set nilai state
  React.useEffect(() => {
    async function fetchNote() {
      const { data } = await NetworkData.getNote(id);
      setNote(data);
    }

    fetchNote();
  }, [id]);

  // functions
  async function onDeleteHandler(id) {
    const { status } = await NetworkData.deleteNote(id);
    alert(status);
    // update note
    setNote("");
    navigate("/");
  }

  async function onArchiveHandler(id) {
    const { status } = await NetworkData.archiveNote(id);
    alert(status);
    // update note
    const { data } = await NetworkData.getNote(id);
    setNote(data);
    navigate("/");
  }

  async function onUnarchiveHandler(id) {
    const { status } = await NetworkData.unarchiveNote(id);
    alert(status);
    // update note
    const { data } = await NetworkData.getNote(id);
    setNote(data);
    navigate("/");
  }

  if (!note) {
    return (
      <section className="error-page">
        <p>Note is not found!</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <NoteDetail
        {...note}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        onUnarchive={onUnarchiveHandler}
      />
    </section>
  );
}

export default DetailPage;
