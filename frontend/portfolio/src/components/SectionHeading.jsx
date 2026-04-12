const SectionHeading = ({ eyebrow, title, description, align = "left" }) => {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-sm font-medium text-muted-foreground mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F8F8F8] mb-3">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground leading-7">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
