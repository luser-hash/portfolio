import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";
import backendIcon from "@/assets/backend.png";
import frontendIcon from "@/assets/ux.png";
import smartphoneIcon from "@/assets/smartphone.png";
import toolsIcon from "@/assets/tools.png";

const skillGroups = [
  {
    icon: backendIcon,
    title: "Backend",
    items: ["Python", "Django", "Django REST Framework", "PostgreSQL", "SQLite"],
  },
  {
    icon: frontendIcon,
    title: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "JavaScript"],
  },
  {
    icon: smartphoneIcon,
    title: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    icon: toolsIcon,
    title: "Tools",
    items: ["Git", "GitHub", "Postman"],
  },
];

const SkillsSection = () => {
  return (
    <section className="site-content-section">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Technologies I use to build products"
        description="My current workflow focuses on practical full-stack development, APIs, modern frontend apps, and mobile experiences."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-[var(--clr-border)] bg-[var(--clr-bg)] p-6"
          >
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#F8F8F8]">
              {group.icon && (
                <img
                  src={group.icon}
                  alt=""
                  aria-hidden="true"
                  className="h-6 w-6 object-contain"
                />
              )}
              <span>{group.title}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
