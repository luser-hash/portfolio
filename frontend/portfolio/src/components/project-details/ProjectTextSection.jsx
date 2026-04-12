const ProjectTextSection = ({
  sectionId,
  sectionTitle,
  sectionNumber,
  content,
}) => {
  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h2 id={`${sectionId}-title`} className="pd-section-title">
        {sectionTitle}
      </h2>
      <p className="pd-description">{content}</p>
    </section>
  );
};

export default ProjectTextSection;
