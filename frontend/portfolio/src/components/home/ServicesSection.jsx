import { Code2, Database, Smartphone, LayoutDashboard } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Code2,
    title: "Web App Development",
    description:
      "I build responsive frontend and full-stack web applications with clean architecture and scalable code.",
  },
  {
    icon: Database,
    title: "Backend API Development",
    description:
      "I design Django and DRF backends with authentication, permissions, business logic, and API integration.",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "I create Flutter applications for product MVPs, business workflows, and mobile-first experiences.",
  },
  {
    icon: LayoutDashboard,
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
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="rounded-2xl border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-6">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;