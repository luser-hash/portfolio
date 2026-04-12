const Footer = () => {
  return (
    <footer className="border-t border-[var(--clr-border)] bg-[var(--clr-bg)]">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          © 2026 Amil. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with React, Django, and shadcn/ui.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
