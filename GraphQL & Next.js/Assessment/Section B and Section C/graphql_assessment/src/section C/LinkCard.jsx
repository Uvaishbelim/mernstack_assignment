import React from 'react';

const LinkCard = ({ title, url }) => {
  return (
    <a className="link-card" href={url} target="_blank" rel="noreferrer">
      <div className="link-card-copy">
        <h3>{title}</h3>
        <p>{url}</p>
      </div>
      <span className="link-card-action">Open</span>
    </a>
  );
};

export default LinkCard;
