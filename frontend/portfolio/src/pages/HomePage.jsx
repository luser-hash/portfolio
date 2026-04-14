import { Facebook, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "@/api/projectsAPi";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import EmptyState from "@/components/EmptyState";
import SkillsSection from "@/components/home/SkillsSection";
import ServicesSection from "@/components/home/ServicesSection";
import SectionHeading from "@/components/SectionHeading";
import { useAsyncData } from "@/hooks/useAsyncData";
import heroPortrait from "@/assets/hero-portrait.png";

const emailAddress = "amilnafis.dev@gmail.com";
const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}`;

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/md-amiluzzaman-nafis",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/luser-hash",
    icon: Github,
  },
  {
    label: "Gmail",
    href: gmailComposeUrl,
    icon: Mail,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/amiluzzaman.nafis",
    icon: Facebook,
  },
];

const HomePage = () => {
  const { data: projects, loading } = useAsyncData(getFeaturedProjects, {
    initialData: [],
  });

  return (
    <div className="home-root">
      {/* Floating 3D shape decorations */}
      <div className="shape shape-tl" />
      <div className="shape shape-tr" />
      <div className="shape shape-bl" />
      <div className="shape shape-bm" />
      <div className="shape shape-bc" />

      <div className="site-page-shell">
        {/* Hero Section */}
        <section className="hero-section">
        {/* Left social sidebar */}
        <aside className="social-sidebar">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="social-icon"
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            );
          })}

          <div className="scroll-indicator">
            <span>scroll down</span>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="currentColor">
              <path d="M5 0v14M1 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </aside>

        {/* Hero Content */}
        <div className="hero-content">
          <div className="hello-label">
            <span className="hello-line" />
            <span>Hello</span>
          </div>

          <h1 className="hero-title">
            I'm <strong>Amiluzzaman Nafis</strong>
          </h1>

          <p className="hero-subtitle">
            A full-stack developer building practical web and mobile products.
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="btn-primary">
              Learn more
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Me
            </Link>
          </div>
        </div>

        <img
          src={heroPortrait}
          alt="Portrait of Amiluzzaman Nafis"
          className="hero-free-image"
        />

        {/* Floating avatar badge top right */}
        <div className="avatar-badge">
          <span>👨‍💻</span>
        </div>
        </section>
      </div>

      <ServicesSection />

      {/* Featured Projects */}
      <section className="site-content-section">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Featured Work"
            title="Projects that demonstrate how I build"
            description="Selected work across backend, full-stack web apps, and mobile product development."
          />
          <Link to="/projects" className="btn-outline-sm">
            See All Projects
          </Link>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyState
            title="No featured projects yet"
            description="Mark some projects as featured from Django admin to show them here."
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <SkillsSection />

      {/* CTA Section */}
      <section className="site-content-section">
        <div className="cta-card">
          <div className="max-w-3xl space-y-4">
            <p className="cta-eyebrow">Let's build something useful</p>
            <h2 className="cta-title">
              Need a developer for your app, dashboard, API, or MVP?
            </h2>
            <p className="cta-body">
              I can help turn ideas into clean, functional software with strong
              backend structure and polished frontend implementation.
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

export default HomePage;
