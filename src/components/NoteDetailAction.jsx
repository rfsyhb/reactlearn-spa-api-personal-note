import PropTypes from "prop-types";
import { MdDelete, MdArchive, MdUnarchive } from "react-icons/md";

function NoteDetailAction({
  id,
  archivedStatus,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  return (
    <>
      {archivedStatus ? (
        <>
          <button className="action" onClick={() => onDelete(id)}>
            <MdDelete />
          </button>
          <button className="action" onClick={() => onUnarchive(id)}>
            <MdUnarchive />
          </button>
        </>
      ) : (
        <>
          <button className="action" onClick={() => onDelete(id)}>
          <MdDelete />
          </button>
          <button className="action" onClick={() => onArchive(id)}>
            <MdArchive />
          </button>
        </>
      )}
    </>
  );
}

NoteDetailAction.propTypes = {
  id: PropTypes.string.isRequired,
  archivedStatus: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
}

export default NoteDetailAction;
