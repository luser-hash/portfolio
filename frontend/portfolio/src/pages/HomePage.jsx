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

      {/* Hero Section */}
      <section className="hero-section">
        {/* Left social sidebar */}
        <aside className="social-sidebar">
          <a href="#" aria-label="Instagram" className="social-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter" className="social-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="social-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="social-icon">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

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

      <ServicesSection />

      {/* Featured Projects */}
      <section className="section-dark container mx-auto px-8 py-20">
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
      <section className="container mx-auto px-8 py-20">
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
