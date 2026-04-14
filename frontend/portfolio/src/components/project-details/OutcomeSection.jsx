const defaultOutcomeParagraph =
  "The project outcome has not been documented yet. Add post-launch notes to the project description to replace this fallback copy.";

const defaultOutcomeQuote =
  "The final result felt polished, easier to use, and much closer to the experience we wanted to deliver.";

const defaultOutcomeAttribution = "Project Stakeholder";

const OutcomeSection = ({ summary, quote, attribution, sectionNumber }) => {
  const outcomeSummary = summary || defaultOutcomeParagraph;
  const outcomeQuote = quote || defaultOutcomeQuote;
  const outcomeAttribution = attribution || defaultOutcomeAttribution;

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

      {(quote || attribution) && (
        <figure className="pd-outcome-quote-block">
          <blockquote className="pd-outcome-quote">
            "{outcomeQuote}"
          </blockquote>
          <figcaption className="pd-outcome-attribution">
            - {outcomeAttribution}
          </figcaption>
        </figure>
      )}
    </section>
  );
};

export default OutcomeSection;
