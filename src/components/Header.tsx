import { NavLink, Link } from "react-router-dom";
import logo from "../assets/react.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
            <img src={logo}/>
            <span>Playground</span>
        </Link>
      </div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tictactoe" className={({ isActive }) => isActive ? "active" : ""}>Tic Tac Toe</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/memory" className={({ isActive }) => isActive ? "active" : ""}>Memory</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/shopping-list" className={({ isActive }) => isActive ? "active" : ""}>Shopping List</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
