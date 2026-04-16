import SafeImage from "@/components/SafeImage";

const defaultProcessParagraphs = [
  "The process for this project has not been documented yet.",
];

const ProcessSection = ({ content, images = [], sectionNumber }) => {
  const processParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : defaultProcessParagraphs;
  const [supportImage, featureImage] = images;

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
          {supportImage?.image ? (
            <SafeImage
              src={supportImage.image}
              alt={supportImage.alt_text || supportImage.caption || "Supporting process artifact"}
              className="pd-process-support-image"
              fallback={
                <div className="pd-visual-placeholder">
                  No supporting process image has been added yet.
                </div>
              }
            />
          ) : (
            <div className="pd-visual-placeholder">
              No supporting process image has been added yet.
            </div>
          )}
        </div>

        <div className="pd-process-card pd-process-card-feature">
          {featureImage?.image ? (
            <SafeImage
              src={featureImage.image}
              alt={featureImage.alt_text || featureImage.caption || "Project process preview"}
              className="pd-process-feature-image"
              fallback={
                <div className="pd-visual-placeholder">
                  Add a feature image to show the process outcome visually.
                </div>
              }
            />
          ) : (
            <div className="pd-visual-placeholder">
              Add a feature image to show the process outcome visually.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
