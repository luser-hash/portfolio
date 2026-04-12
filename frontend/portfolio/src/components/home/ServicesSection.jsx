import SectionHeading from "@/components/SectionHeading";
import programmingIcon from "@/assets/programming.png";
import backendIcon from "@/assets/backend.png";
import mobileDev from "@/assets/development.png";
import dashboardIcon from "@/assets/dashboard.png";

const services = [
  {
    image: programmingIcon,
    title: "Web App Development",
    description:
      "I build responsive frontend and full-stack web applications with clean architecture and scalable code.",
  },
  {
    title: "Backend API Development",
    image: backendIcon,
    description:
      "I design Django and DRF backends with authentication, permissions, business logic, and API integration.",
  },
  {
    image: mobileDev,
    title: "Mobile App Development",
    description:
      "I create Flutter applications for product MVPs, business workflows, and mobile-first experiences.",
  },
  {
    image: dashboardIcon,
    title: "Dashboards & Admin Systems",
    description:
      "I build role-based admin panels, internal tools, dashboards, and data-driven management systems.",
  },
];

const ServicesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeading
        eyebrow="What I Build"
        title="Development services focused on real product needs"
        description="I focus on shipping useful software, not just pretty screens. My work is centered on functionality, maintainability, and user experience."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map(({ description, image, title }) => (
          <div
            key={title}
            className="rounded-2xl border border-[var(--clr-border)] bg-[var(--card-bg)] p-6 text-[#F8F8F8] shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--clr-bg-chip)]">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-7 w-7 object-contain"
              />
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
