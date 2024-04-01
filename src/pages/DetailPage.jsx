import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  archiveNote,
  getNote,
  deleteNote,
  unarchiveNote,
} from "../utils/network-data";
import NoteDetail from "../components/NoteDetail";

function DetailPage() {
  // mengambil id dari url
  const { id } = useParams();

  // navigasi
  const navigate = useNavigate();

  // state
  const [note, setNote] = React.useState(null);

  // Menggunakan effect karena useState tidak bisa asinkron
  React.useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(id);
      setNote(data);
    };

    fetchNote();
  });

  const onDeleteHandler = async (id) => {
    await deleteNote(id);

    setNote("");
    navigate("/");
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);

    const { data } = await getNote(id);
    setNote(data);
    navigate("/");
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);

    const { data } = await getNote(id);
    setNote(data);
    navigate("/");
  };

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
