import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Blog</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/Create">New Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
