import { motion } from "framer-motion";
import { BriefcaseBusiness, CalendarDays, ExternalLink, MapPin, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const ostadCredentialUrl = "https://ostad.app/share/certificate/c41594-md.-amiluzzaman-nafis";

const stats = [
  { value: "1+", label: "Years Building" },
  { value: "5+", label: "Projects Shipped" },
  { value: "2+", label: "MVPs Launched" },
];

const bioData = {
  eyebrow: "Bio & Certificates",
  title: "A developer who likes turning loose requirements into dependable products.",
  description:
    "A structured profile section with a narrative summary, practical key facts, and a certificate gallery that can move to a CMS later without changing the layout contract.",
  story: [
    "I build practical software across backend systems, frontend interfaces, and mobile-first MVPs. My focus is less on shipping flashy demos and more on creating products that stay understandable as they grow.",
    "Most of my work sits at the intersection of API design, product workflow thinking, and interface implementation. I enjoy translating business requirements into clean architecture, usable screens, and reliable delivery.",
    "This portfolio follows the same principle. It is a full-stack build with Django powering content management and React handling the frontend experience, shaped to be easy to extend over time.",
  ],
  focusAreas: ["Backend APIs", "Authentication", "Dashboards", "Business Workflows", "MVP Delivery", "Maintainable UI"],
  keyFacts: [
    {
      label: "Location",
      value: "Dhaka, Bangladesh",
      icon: MapPin,
    },
    {
      label: "Experience",
      value: "1+ years building production-focused apps",
      icon: CalendarDays,
    },
    {
      label: "Current Role",
      value: "Full-Stack Developer",
      icon: BriefcaseBusiness,
    },
    {
      label: "Current Focus",
      value: "Django APIs, React interfaces, and Flutter MVPs",
      icon: Rocket,
    },
  ],
  certificates: [
    {
      id: "python-certificate",
      title: "Python Certificate Title",
      organization: "Ostad.app",
      credentialUrl: ostadCredentialUrl,
      technology: { label: "Python", badge: "PY" },
    },
    {
      id: "react-certificate",
      title: "React Certificate Title",
      organization: "Ostad.app",
      credentialUrl: ostadCredentialUrl,
      technology: { label: "React", badge: "RE" },
    },
    {
      id: "flutter-certificate",
      title: "Flutter Certificate Title",
      organization: "Ostad.app",
      credentialUrl: "https://ostad.app/share/certificate/c30367-md.-amiluzzaman-nafis",
      technology: { label: "Flutter", badge: "FL" },
    },
    {
      id: "rest-api-certificate",
      title: "REST API Certificate Title",
      organization: "Issuing Organization",
      issueDate: "Month YYYY",
      credentialUrl: ostadCredentialUrl,
      technology: { label: "APIs", badge: "API" },
    },
  ],
};

const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const AboutPage = () => {
  return (
    <div className="about-root">
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />
      <div className="shape shape-bl" />
      <div className="shape shape-bm" />

      <div className="site-page-shell">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="hello-label">
            <span className="hello-line" />
            <span>About Me</span>
          </div>

          <h1 className="about-title">
            Developer focused on <span className="about-title-accent">practical</span> full-stack product building
          </h1>

          <div className="about-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat">
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bio And Certificates */}
      <section className="site-content-section site-content-section-tight">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={bioData.eyebrow} title={bioData.title} description={bioData.description} />
          <p className="about-section-note">
            Update the <code>bioData</code> constant to swap in real certificates, dates, and credential links later.
          </p>
        </div>

        <motion.div
          className="about-showcase-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealContainer}
        >
          <motion.article className="about-bio-card" variants={revealItem}>
            <p className="about-card-label">
              <span className="hello-line" /> Professional Narrative
            </p>
            <div className="about-bio-copy">
              {bioData.story.map((paragraph) => (
                <p key={paragraph} className="about-para">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about-focus-wrap">
              <p className="about-mini-label">Focus Areas</p>
              <div className="about-focus-grid">
                {bioData.focusAreas.map((item) => (
                  <span key={item} className="about-focus-chip">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          <motion.aside className="about-facts-card" variants={revealItem}>
            <p className="about-card-label">
              <span className="hello-line" /> Key Facts
            </p>
            <div className="about-facts-grid">
              {bioData.keyFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div key={fact.label} className="about-fact-item">
                    <div className="about-fact-icon" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div className="about-fact-copy">
                      <p className="about-fact-label">{fact.label}</p>
                      <p className="about-fact-value">{fact.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>

        <motion.div
          className="about-certificates-block"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={revealContainer}
        >
          <motion.div className="about-certificates-heading" variants={revealItem}>
            <div>
              <p className="about-card-label">
                <span className="hello-line" /> Certificates Gallery
              </p>
              <h3 className="about-certificates-title">Credentials arranged as reusable content cards.</h3>
            </div>
            <p className="about-certificates-copy">
              Each card is driven by structured data so this section can be connected to a backend or CMS without a
              layout rewrite.
            </p>
          </motion.div>

          <div className="about-certificates-grid">
            {bioData.certificates.map((certificate) => (
              <motion.article
                key={certificate.id}
                className="certificate-card"
                variants={revealItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="certificate-card-top">
                  <div className="certificate-tech-badge" aria-label={certificate.technology.label}>
                    <span className="certificate-tech-badge-mark">{certificate.technology.badge}</span>
                    <span className="certificate-tech-badge-text">{certificate.technology.label}</span>
                  </div>
                  <span className="certificate-issued-pill">{certificate.issueDate}</span>
                </div>

                <div className="certificate-card-body">
                  <div>
                    {certificate.credentialUrl ? (
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="certificate-title-link"
                      >
                        <h3 className="certificate-title">{certificate.title}</h3>
                      </a>
                    ) : (
                      <h3 className="certificate-title">{certificate.title}</h3>
                    )}
                    <p className="certificate-issuer">{certificate.organization}</p>
                  </div>
                </div>

                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-sm certificate-link"
                >
                  View Credential
                  <ExternalLink size={15} strokeWidth={1.8} />
                </a>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="site-content-section site-content-section-tight">
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
