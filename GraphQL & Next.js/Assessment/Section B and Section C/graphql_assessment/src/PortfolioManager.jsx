import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import './PortfolioManager.css';

const PortfolioManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', year: new Date().getFullYear() });

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'year' ? parseInt(value) : value
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      const newProject = {
        id: Date.now(),
        ...formData
      };
      setProjects([...projects, newProject]);
      setFormData({ title: '', description: '', year: new Date().getFullYear() });
    }
  };

  const handleClearPortfolio = () => {
    if (window.confirm('Are you sure you want to clear your entire portfolio? This action cannot be undone.')) {
      setProjects([]);
      localStorage.removeItem('projects');
    }
  };

  return (
    <div className="portfolio-manager">
      <h1>Creator Portfolio Builder</h1>

      {/* Form Section */}
      <div className="form-section">
        <h2>Add a New Project</h2>
        <form onSubmit={handleAddProject}>
          <div className="form-group">
            <label htmlFor="title">Project Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              min="2000"
              max={new Date().getFullYear()}
            />
          </div>

          <button type="submit" className="btn-add">Add Project</button>
        </form>
      </div>

      {/* Projects Grid or Empty State */}
      <div className="projects-section">
        {projects.length === 0 ? (
          <div className="empty-state">
            <h2>Getting Started</h2>
            <p>You haven't added any projects to your portfolio yet!</p>
            <p>Start by filling out the form above to showcase your work.</p>
          </div>
        ) : (
          <>
            <div className="projects-header">
              <h2>Your Projects ({projects.length})</h2>
              <button onClick={handleClearPortfolio} className="btn-clear">
                Clear Portfolio
              </button>
            </div>
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  year={project.year}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;
