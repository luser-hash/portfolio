const defaultOutcomeParagraph =
  "The project outcome has not been documented yet. Add post-launch notes to the project description to replace this fallback copy.";

const defaultOutcomeQuote =
  "The final result felt polished, easier to use, and much closer to the experience we wanted to deliver.";

const defaultOutcomeAttribution = "Project Stakeholder";

const OutcomeSection = ({ content, sectionNumber }) => {
  const outcomeParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.replace(/^\s*[-*]\s*/, "").trim())
        .filter(Boolean)
    : [defaultOutcomeParagraph];

  const outcomeSummary = outcomeParagraphs[0] || defaultOutcomeParagraph;
  const outcomeQuote = outcomeParagraphs[1] || defaultOutcomeQuote;
  const outcomeAttribution = outcomeParagraphs[2] || defaultOutcomeAttribution;

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="outcome-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h1 id="outcome-title" className="pd-section-title">
        Outcome
      </h1>

      <p className="pd-description">{outcomeSummary}</p>

      <figure className="pd-outcome-quote-block">
        <blockquote className="pd-outcome-quote">
          "{outcomeQuote}"
        </blockquote>
        <figcaption className="pd-outcome-attribution">
          - {outcomeAttribution}
        </figcaption>
      </figure>
    </section>
  );
};

export default OutcomeSection;
