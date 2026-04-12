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
import projectImage from "@/assets/image.png";
import featuredImage from "@/assets/feature-selection.png";
import successfulImage from "@/assets/successful.png";

const ProjectCard = ({ project }) => {
  const isFeatured = project.featured;
  const statusIcon =
    project.status === "in_progress"
      ? projectImage
      : project.status === "completed"
        ? successfulImage
        : null;

  return (
    <Card className="h-full rounded-2xl border-[var(--clr-border)] bg-[var(--clr-bg)] text-[#F8F8F8] transition-all duration-200 hover:shadow-lg">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex flex-col items-center gap-2">
                {statusIcon && (
                  <img
                    src={statusIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8 object-contain"
                  />
                )}
                <ProjectStatusBadge status={project.status} />
              </div>

              {isFeatured && (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={featuredImage}
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-8 object-contain"
                  />
                  <Badge variant="secondary">Featured</Badge>
                </div>
              )}
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
