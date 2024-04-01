import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { showFormattedDate } from "../utils/index";
import NoteDetailAction from "./NoteDetailAction";
import LocaleContext from "../contexts/LocaleContext";

function NoteDetail({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(createdAt, locale)}</p>
      <p className="detail-page__body">{parse(body)}</p>
      <div className="detail-page__action">
        <NoteDetailAction
          id={id}
          archivedStatus={archived}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
        />
      </div>
    </section>
  );
}

NoteDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default NoteDetail;
