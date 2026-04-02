import { useEffect, useState } from "react";
import { getProjects } from "@/api/projectsAPi";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import EmptyState from "@/components/EmptyState";
import SectionHeading from "@/components/SectionHeading";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="projects-root">
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />
      <div className="shape shape-bl" />

      {/* Page header card */}
      <div className="projects-hero">
        <div className="hello-label">
          <span className="hello-line" />
          <span>Portfolio</span>
        </div>
        <h1 className="projects-title">
          Projects I have <span className="contact-title-accent">built</span>
        </h1>
        <p className="projects-subtitle">
          A growing collection of full-stack, backend, and mobile projects that reflect
          my development approach and technical range.
        </p>

        {/* Decorative count badge */}
        {!loading && !error && projects.length > 0 && (
          <div className="projects-count-badge">
            <span className="projects-count-value">{projects.length}</span>
            <span className="projects-count-label">projects</span>
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="projects-grid-wrapper">
        {loading && (
          <div className="projects-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="projects-error">
            <span className="projects-error-icon">⚠</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <EmptyState
            title="No projects added yet"
            description="Add projects from Django admin and they will appear here automatically."
          />
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;