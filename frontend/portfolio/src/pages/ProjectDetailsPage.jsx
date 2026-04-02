import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectDetails } from "@/api/projectsAPi";
import ProjectStatusBadge from "@/components/ProjectStatusBadge";

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectDetails(slug);
        setProject(data);
      } catch (err) {
        setError("Failed to load project details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="pd-root">
        <div className="pd-loading">
          <div className="pd-loading-bar" />
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pd-root">
        <div className="pd-error">
          <span className="projects-error-icon">⚠</span>
          <p>{error}</p>
          <Link to="/projects"><button className="btn-outline">Back to Projects</button></Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd-root">
        <div className="pd-error">
          <p>Project not found.</p>
          <Link to="/projects"><button className="btn-outline">Back to Projects</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-root">
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />

      {/* Hero banner */}
      <div className="pd-hero">
        <div className="pd-hero-inner">
          {/* Back link */}
          <Link to="/projects" className="pd-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            All Projects
          </Link>

          {/* Badges */}
          <div className="pd-badges">
            <ProjectStatusBadge status={project.status} />
            {project.category?.name && (
              <span className="pd-category">{project.category.name}</span>
            )}
          </div>

          <h1 className="pd-title">{project.title}</h1>

          <p className="pd-short-desc">{project.short_description}</p>

          {/* Skill chips */}
          {project.skills?.length > 0 && (
            <div className="stack-grid pd-skills">
              {project.skills.map((skill) => (
                <span key={skill.id} className="stack-chip">
                  <span className="stack-chip-name">{skill.name}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="pd-body">
        {/* Overview card */}
        <div className="pd-overview-card">
          <p className="about-card-label">
            <span className="hello-line" /> Project Overview
          </p>
          <p className="pd-description">{project.description}</p>
        </div>

        {/* Links */}
        {(project.github_link || project.live_demo_link) && (
          <div className="pd-links">
            {project.github_link && (
              <a href={project.github_link} target="_blank" rel="noreferrer">
                <button className="btn-primary">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: '0.5rem'}}>
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub Repository
                </button>
              </a>
            )}
            {project.live_demo_link && (
              <a href={project.live_demo_link} target="_blank" rel="noreferrer">
                <button className="btn-outline">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: '0.5rem'}}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Live Demo
                </button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;