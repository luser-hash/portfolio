import learningHubPreview from "@/assets/learning-hub-preview.png";

const OverviewSection = ({
  project,
  sectionTitle,
  sectionNumber,
  actionHref,
  actionLabel,
}) => {
  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="overview-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h2 id="overview-title" className="pd-section-title">
        {sectionTitle}
      </h2>

      <div className="pd-meta-grid">
        <div className="pd-meta-card">
          <span className="pd-meta-label">Role</span>
          <span className="pd-meta-value">
            {project.category?.name || "Project build"}
          </span>
        </div>
        <div className="pd-meta-card">
          <span className="pd-meta-label">Status</span>
          <span className="pd-meta-value">
            {project.status?.replace(/_/g, " ") || "Completed"}
          </span>
        </div>
        <div className="pd-meta-card">
          <span className="pd-meta-label">Tools</span>
          <span className="pd-meta-value">
            {project.skills?.length
              ? project.skills.map((skill) => skill.name).join(", ")
              : "Project stack"}
          </span>
        </div>
        <div className="pd-meta-card">
          <span className="pd-meta-label">Type</span>
          <span className="pd-meta-value">
            {project.live_demo_link ? "Live product" : "Case study"}
          </span>
        </div>
      </div>

      <div className="pd-image-section">
        <div className="pd-image-section-header">
          <span className="pd-meta-label">Project Image</span>
        </div>

        <div className="pd-visual-frame">
          <img
            src={learningHubPreview}
            alt={`${project.title} preview`}
            className="pd-visual-image"
          />
        </div>

        <div className="pd-image-section-actions">
          {actionHref ? (
            <a
              href={actionHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              {actionLabel}
            </a>
          ) : (
            <span className="pd-disabled-button">Visit Live Site</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
