const ChallengeSection = ({ sectionNumber, content }) => {
  const challengeDescription =
    content || "Challenge details for this project have not been documented yet.";
  const projectGoals = challengeDescription
    .split("\n")
    .map((line) => line.replace(/^\s*[-*]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, 3);
  const fallbackGoals = [
    "Reduce friction in the core user flow",
    "Improve clarity across the main product journey",
    "Create a smoother and more reliable experience",
  ];

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="challenge-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h1 id="challenge-title" className="pd-section-title">
        The Challenge
      </h1>
      <p className="pd-description">{challengeDescription}</p>

      <div className="pd-challenge-card" aria-labelledby="project-goals-title">
        <h2 id="project-goals-title" className="pd-challenge-card-title">
          Project Goals
        </h2>
        <div className="pd-challenge-goals">
          {(projectGoals.length ? projectGoals : fallbackGoals).map((goal) => (
            <p key={goal} className="pd-challenge-goal">
              {goal}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
