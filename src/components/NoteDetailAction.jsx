import { MdArchive, MdDelete, MdUnarchive } from "react-icons/md";
import PropTypes from "prop-types";

function NoteDetailAction({
  id,
  isArchived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  return (
    <>
      {isArchived ? (
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
  isArchived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteDetailAction;
