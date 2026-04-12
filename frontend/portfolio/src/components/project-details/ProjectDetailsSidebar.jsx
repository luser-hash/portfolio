const ProjectDetailsSidebar = ({
  sections,
  activeSectionId,
  onSectionSelect,
}) => {
  return (
    <aside className="pd-sidebar" aria-label="Project sections">
      <nav className="pd-sidebar-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`pd-sidebar-link ${
              activeSectionId === section.id ? "pd-sidebar-link-active" : ""
            }`}
            onClick={() => onSectionSelect(section.id)}
            aria-pressed={activeSectionId === section.id}
          >
            {section.title}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default ProjectDetailsSidebar;
