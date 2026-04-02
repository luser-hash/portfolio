import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/SectionHeading";

const skillGroups = [
  {
    title: "Backend",
    items: ["Python", "Django", "Django REST Framework", "PostgreSQL", "SQLite"],
  },
  {
    title: "Frontend",
    items: ["React", "Vite", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Postman"],
  },
];

const SkillsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Technologies I use to build products"
        description="My current workflow focuses on practical full-stack development, APIs, modern frontend apps, and mobile experiences."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.title} className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">{group.title}</h3>
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