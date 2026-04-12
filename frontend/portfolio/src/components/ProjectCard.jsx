import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProjectStatusBadge from "@/components/ProjectStatusBadge";

const ProjectCard = ({ project }) => {
  return (
    <Card className="h-full rounded-2xl border-border/70 hover:shadow-lg transition-all duration-200">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <ProjectStatusBadge status={project.status} />
              {project.featured && <Badge variant="secondary">Featured</Badge>}
            </div>

            <CardTitle className="text-xl leading-tight">
              {project.title}
            </CardTitle>

            <CardDescription className="text-sm leading-6">
              {project.short_description}
            </CardDescription>
          </div>

          <Link
            to={`/projects/${project.slug}`}
            className="rounded-full border p-2 hover:bg-accent transition-colors shrink-0"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="mb-2 text-sm text-muted-foreground">
          {project.category?.name || "Uncategorized"}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.skills?.map((skill) => (
            <Badge key={skill.id} variant="secondary">
              {skill.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          {project.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}

          {project.live_demo_link && (
            <a
              href={project.live_demo_link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Globe className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
