import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils/index";
import parse from "html-react-parser";
import LocaleContext from "../contexts/LocaleContext";

function NoteItem({ id, title, body, createdAt }) {
  const { locale } = React.useContext(LocaleContext);
  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt, locale)}</p>
      <p className="note-item__body">{parse(body)}</p>
    </article>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;
