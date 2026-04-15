import SafeImage from "@/components/SafeImage";

const fallbackOverviewParagraphs = [
  "This project overview has not been documented yet.",
];

const OverviewSection = ({
  content,
  project,
  sectionTitle,
  sectionNumber,
  actionHref,
  actionLabel,
}) => {
  const overviewParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : fallbackOverviewParagraphs;
  const previewImage = project.cover_image || project.images?.[0]?.image || "";
  const previewAlt =
    project.images?.find((image) => image.image === previewImage)?.alt_text ||
    `${project.title} preview`;
  const projectType =
    project.project_type === "live_product" ? "Live product" : "Case study";

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="overview-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h2 id="overview-title" className="pd-section-title">
        {sectionTitle}
      </h2>

      <div className="pd-process-copy">
        {overviewParagraphs.map((paragraph) => (
          <p key={paragraph} className="pd-description">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="pd-meta-grid">
        <div className="pd-meta-card">
          <span className="pd-meta-label">Role</span>
          <span className="pd-meta-value">
            {project.role_label || project.category?.name || "Project build"}
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
            {projectType}
          </span>
        </div>
      </div>

      <div className="pd-image-section">
        <div className="pd-image-section-header">
          <span className="pd-meta-label">Project Image</span>
        </div>

        <div className="pd-visual-frame">
          {previewImage ? (
            <SafeImage
              src={previewImage}
              alt={previewAlt}
              className="pd-visual-image"
              fallback={
                <div className="pd-visual-placeholder">
                  No preview image has been added for this project yet.
                </div>
              }
            />
          ) : (
            <div className="pd-visual-placeholder">
              No preview image has been added for this project yet.
            </div>
          )}
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
