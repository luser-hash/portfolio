import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "text-foreground font-medium"
    : "text-muted-foreground hover:text-foreground transition-colors";

const Navbar = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Amil.dev
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        <Link to="/contact">
          <Button>Hire Me</Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;