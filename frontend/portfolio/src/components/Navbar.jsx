import { Link, NavLink } from "react-router-dom";
import amilDevLogo from "@/assets/pp.png";
import hireMeIcon from "@/assets/recruitment_7719528.png";

const navLinkClass = ({ isActive }) =>
  isActive
    ? "site-nav-link site-nav-link-active"
    : "site-nav-link";

const Navbar = () => {
  return (
    <header className="site-navbar border-b">
      <div className="container mx-auto px-2 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-0.25 text-xl font-bold text-[#F8F8F8]">
          <img
            src={amilDevLogo}
            alt="Amil.dev logo"
            className="h-17 w-auto object-contain sm:h-18"
          />
          <span>Amil.dev</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/projects" className={navLinkClass}>Projects</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
        </nav>

        <Link to="/contact" className="site-navbar-cta">
          <img
            src={hireMeIcon}
            alt=""
            aria-hidden="true"
            className="site-navbar-cta-icon"
          />
          <span>Hire Me</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
