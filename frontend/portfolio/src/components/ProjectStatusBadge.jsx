import { Badge } from "@/components/ui/badge";

const statusMap = {
  planned: {
    label: "Planned",
    className: "bg-secondary text-secondary-foreground",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
};

const ProjectStatusBadge = ({ status }) => {
  const current = statusMap[status] || {
    label: status,
    className: "",
  };

  return (
    <Badge variant="outline" className={current.className}>
      {current.label}
    </Badge>
  );
};

export default ProjectStatusBadge;