import React from "react";
import PropTypes from "prop-types";
import { showFormattedDate } from "../utils/index";
import AppContext from "../contexts/AppContext";
import parse from "html-react-parser";
import NoteDetailAction from "./NoteDetailAction";

function NoteDetail({
  onDelete,
  onArchive,
  onUnarchive,
  id,
  title,
  body,
  createdAt,
  archived,
}) {
  const { locale } = React.useContext(AppContext);
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">
        {showFormattedDate(createdAt, locale)}
      </p>
      <p className="detail-page__body">{parse(body)}</p>
      <div className="detail-page__action">
        <NoteDetailAction
          id={id}
          isArchived={archived}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default NoteDetail;
