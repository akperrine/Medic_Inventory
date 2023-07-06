import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";
import { useState } from "react";

function Navigation() {
  return (
    <>
      <nav className="navbar">
        <img
          className="logo"
          src="src/assets/rexd-medical-supplies-high-resolution-logo-white-on-transparent-background.png"
          alt="logo"
        />
        <ul className="nav-list">
          <button className="home-btn">
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
          </button>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
