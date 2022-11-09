import "./Header.scoped.css";
import { Link } from "react-router-dom";

const Header = ({ title, logoSrc, children }) => {
  return (
    <header className="top-app-bar">
      <Link to="/" className="unstyled-link title-link">
        <img className="logo" src={logoSrc} alt={`${title} logo`} />
        <h1 className="title">{title}</h1>
      </Link>
      <div className="right-content">{children}</div>
    </header>
  );
};

export default Header;
