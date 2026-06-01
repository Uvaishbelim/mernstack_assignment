import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ title, description, year }) => {
  return (
    <div className="project-card">
      <h3>{title}</h3>
      <p className="description">{description}</p>
      <p className="year">{year}</p>
    </div>
  );
};

export default ProjectCard;
