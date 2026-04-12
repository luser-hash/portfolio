import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectDetails, getProjects } from "@/api/projectsAPi";
import ChallengeSection from "@/components/project-details/ChallengeSection";
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
  challenge: "Challenge",
  process: "Process",
  solution: "Solution",
  outcome: "Outcome",
};

const sectionOrder = ["overview", "challenge", "process", "solution", "outcome"];

const normalizeSectionContent = (value) =>
  value
    ?.replace(/^\s*[-#]+\s*/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim() || "";

const getProjectSections = (project) => {
  const description = project.description?.trim() || "";
  const parsedSections = {};
  const sectionPattern =
    /(overview|challenge|process|solution|outcome)\s*:?\s*([\s\S]*?)(?=(?:^|\n)\s*(?:overview|challenge|process|solution|outcome)\s*:?\s*|\s*$)/gi;
  let match;

  while ((match = sectionPattern.exec(description)) !== null) {
    const sectionKey = match[1].toLowerCase();
    const sectionValue = normalizeSectionContent(match[2]);

    if (sectionValue) {
      parsedSections[sectionKey] = sectionValue;
    }
  }

  const hasStructuredSections = Object.keys(parsedSections).length > 0;

  return sectionOrder.map((key) => {
    if (hasStructuredSections) {
      return {
        id: key,
        title: sectionLabels[key],
        content:
          parsedSections[key] || "This part of the case study has not been documented yet.",
      };
    }

    if (key === "overview") {
      return {
        id: key,
        title: sectionLabels[key],
        content: normalizeSectionContent(description || project.short_description),
      };
    }

    if (key === "outcome") {
      const outcomes = [
        project.status && `Status: ${project.status.replace(/_/g, " ")}`,
        project.category?.name && `Category: ${project.category.name}`,
        project.skills?.length > 0 &&
          `Core stack: ${project.skills.map((skill) => skill.name).join(", ")}`,
      ].filter(Boolean);

      return {
        id: key,
        title: sectionLabels[key],
        content:
          outcomes.join("\n") || "Project outcomes and follow-up notes have not been documented yet.",
      };
    }

    return {
      id: key,
      title: sectionLabels[key],
      content: "This part of the case study has not been documented yet.",
    };
  });
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
  const { data: allProjects } = useAsyncData(getProjects, {
    initialData: [],
    errorMessage: "Failed to load projects.",
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
  const adjacentProjects = useMemo(() => {
    if (!project || allProjects.length < 2) {
      return { previousProject: null, nextProject: null };
    }

    const currentIndex = allProjects.findIndex(
      (currentProject) => currentProject.slug === project.slug
    );

    if (currentIndex === -1) {
      return { previousProject: null, nextProject: null };
    }

    const previousIndex =
      currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1;

    return {
      previousProject: allProjects[previousIndex],
      nextProject: allProjects[nextIndex],
    };
  }, [allProjects, project]);

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
              project={project}
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

          {activeSection?.id === "process" && (
            <ProcessSection
              sectionNumber={activeSectionNumber}
              content={activeSection.content}
            />
          )}

          {activeSection?.id === "solution" && (
            <SolutionSection
              sectionNumber={activeSectionNumber}
              content={activeSection.content}
            />
          )}

          {activeSection?.id === "outcome" && (
            <OutcomeSection
              sectionNumber={activeSectionNumber}
              content={activeSection.content}
            />
          )}

          {activeSection && activeSection.id !== "overview" && (
            activeSection.id !== "challenge" &&
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
        previousProject={adjacentProjects.previousProject}
        nextProject={adjacentProjects.nextProject}
      />
    </div>
  );
};

export default ProjectDetailsPage;
