import { FolderOpen } from "lucide-react";

const EmptyState = ({
  title = "Nothing to show yet",
  description = "Content will appear here when available.",
}) => {
  return (
    <div className="border rounded-2xl p-10 text-center bg-card">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FolderOpen className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default EmptyState;