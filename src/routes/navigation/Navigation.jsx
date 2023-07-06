import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <>
      <nav className="navbar">
        <h1 className="nav-title">Rex'd Medical Supplies</h1>
        <ul className="nav-list">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
