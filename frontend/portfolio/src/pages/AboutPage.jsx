import { Link } from "react-router-dom";

const stack = [
  { name: "Python", icon: "🐍" },
  { name: "Django", icon: "🎸" },
  { name: "Django REST Framework", icon: "🔌" },
  { name: "React", icon: "⚛️" },
  { name: "Vite", icon: "⚡" },
  { name: "Flutter", icon: "🐦" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "SQLite", icon: "🗃️" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Git", icon: "🔀" },
];

const stats = [
  { value: "1+", label: "Years Building" },
  { value: "5+", label: "Projects Shipped" },
  { value: "2+", label: "MVPs Launched" },
];

const AboutPage = () => {
  return (
    <div className="about-root">
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />
      <div className="shape shape-bl" />
      <div className="shape shape-bm" />

      <section className="about-hero">
        <div className="hello-label">
          <span className="hello-line" />
          <span>About Me</span>
        </div>

        <h1 className="about-title">
          Developer focused on <span className="about-title-accent">practical</span> full-stack product building
        </h1>

        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="about-body">
        <div className="about-prose-col">
          <div className="about-card">
            <p className="about-card-label">
              <span className="hello-line" /> Background
            </p>
            <p className="about-para">
              I am a developer with experience in Python, Django, React Vite, and Flutter. I enjoy building products
              that are not only functional but also structured in a way that is easy to maintain and extend.
            </p>
          </div>

          <div className="about-card">
            <p className="about-card-label">
              <span className="hello-line" /> What I Do
            </p>
            <p className="about-para">
              My work usually involves backend API development, frontend interfaces, authentication systems,
              dashboards, business workflows, and MVP-style product builds. I like turning project requirements into
              complete working solutions.
            </p>
          </div>

          <div className="about-card">
            <p className="about-card-label">
              <span className="hello-line" /> This Portfolio
            </p>
            <p className="about-para">
              This portfolio is also one of my projects - built as a full-stack application using Django for content
              management and React for the frontend.
            </p>
          </div>
        </div>

        <div className="about-stack-col">
          <p className="about-card-label mb-6">
            <span className="hello-line" /> Core Stack
          </p>
          <div className="stack-grid">
            {stack.map((item) => (
              <div key={item.name} className="stack-chip">
                <span className="stack-chip-icon">{item.icon}</span>
                <span className="stack-chip-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-8 py-16">
        <div className="cta-card">
          <div className="max-w-3xl space-y-4">
            <p className="cta-eyebrow">Let's build something useful</p>
            <h2 className="cta-title">Interested in working together?</h2>
            <p className="cta-body">
              I'm open to freelance projects, collaborations, and full-time opportunities. Reach out and let's talk
              about what you're building.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="btn-primary">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
