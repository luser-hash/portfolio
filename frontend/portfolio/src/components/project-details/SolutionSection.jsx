import {
  Clock3,
  PanelsTopLeft,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const solutionHighlights = [
  {
    title: "Streamlined Checkout",
    description:
      "Reduced the checkout process to a faster, clearer flow with smoother error handling and fewer distractions.",
    icon: ShoppingCart,
  },
  {
    title: "Visual Navigation",
    description:
      "Improved browsing with clearer category structure, stronger hierarchy, and more discoverable navigation cues.",
    icon: PanelsTopLeft,
  },
  {
    title: "Real-time Inventory",
    description:
      "Surfaced availability signals and supporting product states to reduce confusion and improve purchase confidence.",
    icon: Clock3,
  },
  {
    title: "Personalization Engine",
    description:
      "Shaped a more relevant shopping journey with recommendation-driven content and context-aware product discovery.",
    icon: Sparkles,
  },
];

const defaultSolutionParagraphs = [
  "The final solution has not been documented yet.",
  "Add solution notes to the project description to replace this fallback copy.",
];

const SolutionSection = ({ content, sectionNumber }) => {
  const solutionParagraphs = content
    ? content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.replace(/^\s*[-*]\s*/, "").trim())
        .filter(Boolean)
    : defaultSolutionParagraphs;

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
