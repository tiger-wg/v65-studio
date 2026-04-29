import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar header2">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          V65 Studio
        </Link>

        <div className="navbar-links">
          <Link to="/frame-by-frame">
            FRAME-by-FRAME
          </Link>
          <Link to="/baked">
            BAKED & HALFBAKED
          </Link>
          <Link to="/coffee">
            COFFEE RUNS
          </Link>
        </div>
      </div>
    </nav>
  );
}



