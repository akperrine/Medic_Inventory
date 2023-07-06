import { Link, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <nav>
        <h1>Navigation</h1>
        <Link to={"/"}>Home</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navigation;
