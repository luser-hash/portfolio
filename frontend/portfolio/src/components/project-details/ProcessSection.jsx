import dashboardImage from "@/assets/dashboard.png";
import learningHubPreview from "@/assets/learning-hub-preview.png";

const defaultProcessParagraphs = [
  "The process for this project has not been documented yet.",
  "Add process notes to the project description to replace this fallback copy.",
];

const ProcessSection = ({ content, sectionNumber }) => {
  const processParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.replace(/^\s*[-*]\s*/, "").trim())
        .filter(Boolean)
    : defaultProcessParagraphs;

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="process-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h1 id="process-title" className="pd-section-title">
        Process
      </h1>

      <div className="pd-process-copy">
        {processParagraphs.map((paragraph) => (
          <p key={paragraph} className="pd-description">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="pd-process-media">
        <div className="pd-process-card pd-process-card-support">
          <img
            src={dashboardImage}
            alt="Supporting process artifact"
            className="pd-process-support-image"
          />
        </div>

        <div className="pd-process-card pd-process-card-feature">
          <img
            src={learningHubPreview}
            alt="Project process preview"
            className="pd-process-feature-image"
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
