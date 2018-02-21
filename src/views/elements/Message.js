import React from 'react';
import PropTypes from 'prop-types';

const Message = ({
  type, title, body, onClose
}) => {
  const bodyElement = body ? (<div className="message-body">{body}</div>) : null;

  return (
    <article className={`message is-${type}`}>
      <div className="message-header">
        <p>{title}</p>
        <button tabIndex={0} className="delete" aria-label="delete" onClick={onClose} />
      </div>
      {bodyElement}
    </article>);
};

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
  body: PropTypes.string
};

export default Message;
