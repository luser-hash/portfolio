import {
  Clock3,
  PanelsTopLeft,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const defaultSolutionParagraphs = [
  "The final solution has not been documented yet.",
  "Add solution notes from admin to replace this fallback copy.",
];

const highlightIcons = [ShoppingCart, PanelsTopLeft, Clock3, Sparkles];

const SolutionSection = ({ content, sectionNumber }) => {
  const solutionParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : defaultSolutionParagraphs;
  const solutionHighlights = solutionParagraphs.slice(0, 4).map((paragraph, index) => ({
    title: `Solution ${String(index + 1).padStart(2, "0")}`,
    description: paragraph.replace(/^\s*[-*]\s*/, ""),
    icon: highlightIcons[index % highlightIcons.length],
  }));

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="solution-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h1 id="solution-title" className="pd-section-title">
        Solution
      </h1>

      <div className="pd-solution-copy">
        {solutionParagraphs.map((paragraph) => (
          <p key={paragraph} className="pd-description">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="pd-solution-grid">
        {solutionHighlights.map(({ title, description, icon: Icon }) => (
          <article key={title} className="pd-solution-card">
            <div className="pd-solution-card-header">
              <span className="pd-solution-icon-wrap" aria-hidden="true">
                <Icon className="pd-solution-icon" />
              </span>
              <h2 className="pd-solution-card-title">{title}</h2>
            </div>
            <p className="pd-solution-card-body">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SolutionSection;
