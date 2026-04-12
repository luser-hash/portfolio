import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const MoreCaseStudiesSection = ({ previousProject, nextProject }) => {
  if (!previousProject && !nextProject) {
    return null;
  }

  return (
    <section className="pd-more-case-studies" aria-labelledby="more-case-studies-title">
      <h2 id="more-case-studies-title" className="pd-more-case-studies-title">
        More Projects
      </h2>

      <div className="pd-more-case-studies-grid">
        {previousProject && (
          <Link
            to={`/projects/${previousProject.slug}`}
            className="pd-case-study-card pd-case-study-card-prev"
          >
            <ArrowLeft className="pd-case-study-arrow" aria-hidden="true" />
            <div className="pd-case-study-copy">
              <span className="pd-case-study-label">Previous Project</span>
              <span className="pd-case-study-name">{previousProject.title}</span>
            </div>
          </Link>
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="pd-case-study-card pd-case-study-card-next"
          >
            <div className="pd-case-study-copy">
              <span className="pd-case-study-label">Next Project</span>
              <span className="pd-case-study-name">{nextProject.title}</span>
            </div>
            <ArrowRight className="pd-case-study-arrow" aria-hidden="true" />
          </Link>
        )}
      </div>
    </section>
  );
};

export default MoreCaseStudiesSection;
