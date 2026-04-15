import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectDetails } from "@/api/projectsAPi";
import ChallengeSection from "@/components/project-details/ChallengeSection";
import GallerySection from "@/components/project-details/GallerySection";
import MoreCaseStudiesSection from "@/components/project-details/MoreCaseStudiesSection";
import ProcessSection from "@/components/project-details/ProcessSection";
import ProjectStatusBadge from "@/components/ProjectStatusBadge";
import OverviewSection from "@/components/project-details/OverviewSection";
import OutcomeSection from "@/components/project-details/OutcomeSection";
import ProjectDetailsSidebar from "@/components/project-details/ProjectDetailsSidebar";
import SolutionSection from "@/components/project-details/SolutionSection";
import ProjectTextSection from "@/components/project-details/ProjectTextSection";
import { useAsyncData } from "@/hooks/useAsyncData";

const sectionLabels = {
  overview: "Overview",
  gallery: "Gallery",
  challenge: "Challenge",
  process: "Process",
  solution: "Solution",
  outcome: "Outcome",
};

const sectionDefinitions = [
  { id: "overview", contentKey: "overview_text" },
  { id: "gallery", contentKey: null },
  { id: "challenge", contentKey: "challenge_text" },
  { id: "process", contentKey: "process_text" },
  { id: "solution", contentKey: "solution_text" },
  { id: "outcome", contentKey: "outcome_summary" },
];

const getProjectSections = (project) => {
  return sectionDefinitions.map(({ id, contentKey }) => ({
    id,
    title: sectionLabels[id],
    content: contentKey ? project?.[contentKey] || "" : "",
  }));
};

const ProjectDetailsPage = () => {
  const { slug } = useParams();
  const {
    data: project,
    error,
    loading,
  } = useAsyncData(() => getProjectDetails(slug), {
    errorMessage: "Failed to load project details.",
    initialData: null,
    watch: slug,
  });
  const projectSections = useMemo(
    () => (project ? getProjectSections(project) : []),
    [project]
  );
  const [activeSectionId, setActiveSectionId] = useState("overview");
  const activeSection =
    projectSections.find((section) => section.id === activeSectionId) ||
    projectSections[0] ||
    null;
  const activeSectionNumber = String(
    projectSections.findIndex((section) => section.id === activeSection?.id) + 1
  ).padStart(2, "0");
  const overviewActionHref = project?.live_demo_link || project?.github_link || "";
  const overviewActionLabel = project?.live_demo_link
    ? "Visit Live Site"
    : project?.github_link
      ? "View Project"
      : "Visit Live Site";
  const projectImages = useMemo(
    () => (project?.images || []).filter((image) => image?.image),
    [project]
  );
  const projectWithValidImages = useMemo(
    () => (project ? { ...project, images: projectImages } : null),
    [project, projectImages]
  );
  const processImages = useMemo(
    () => projectImages.filter((image) => image.kind === "process"),
    [projectImages]
  );
  const galleryImages = useMemo(
    () => projectImages.filter((image) => image.kind === "gallery"),
    [projectImages]
  );

  useEffect(() => {
    if (!projectSections.length) {
      return;
    }

    setActiveSectionId((current) =>
      projectSections.some((section) => section.id === current)
        ? current
        : projectSections[0].id
    );
  }, [projectSections]);

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
          <Link to="/projects" className="btn-outline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pd-root">
        <div className="pd-error">
          <p>Project not found.</p>
          <Link to="/projects" className="btn-outline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pd-root">
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />

      <div className="project-page-shell">
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
          <ProjectDetailsSidebar
            sections={projectSections}
            activeSectionId={activeSectionId}
            onSectionSelect={setActiveSectionId}
          />

          <div className="pd-content">
            {activeSection?.id === "overview" && (
              <OverviewSection
                project={projectWithValidImages}
                content={projectWithValidImages.overview_text}
                sectionTitle={activeSection.title}
                sectionNumber={activeSectionNumber}
                actionHref={overviewActionHref}
                actionLabel={overviewActionLabel}
              />
            )}

          {activeSection?.id === "challenge" && (
            <ChallengeSection
              sectionNumber={activeSectionNumber}
              content={activeSection.content}
            />
          )}

          {activeSection?.id === "gallery" && (
            <GallerySection
              sectionNumber={activeSectionNumber}
              images={galleryImages.length > 0 ? galleryImages : projectImages}
            />
          )}

          {activeSection?.id === "process" && (
            <ProcessSection
                sectionNumber={activeSectionNumber}
                content={projectWithValidImages.process_text}
                images={processImages.length > 0 ? processImages : galleryImages}
              />
            )}

            {activeSection?.id === "solution" && (
              <SolutionSection
                sectionNumber={activeSectionNumber}
                content={projectWithValidImages.solution_text}
              />
            )}

            {activeSection?.id === "outcome" && (
              <OutcomeSection
                sectionNumber={activeSectionNumber}
                summary={projectWithValidImages.outcome_summary}
                quote={projectWithValidImages.outcome_quote}
                attribution={projectWithValidImages.outcome_attribution}
              />
            )}

            {activeSection && activeSection.id !== "overview" && (
              activeSection.id !== "challenge" &&
              activeSection.id !== "gallery" &&
              activeSection.id !== "process" &&
              activeSection.id !== "solution" &&
              activeSection.id !== "outcome" && (
              <ProjectTextSection
                sectionId={activeSection.id}
                sectionTitle={activeSection.title}
                sectionNumber={activeSectionNumber}
                content={activeSection.content}
              />
              )
            )}
          </div>
        </div>

        <MoreCaseStudiesSection
          previousProject={project.previous_project}
          nextProject={project.next_project}
        />
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
