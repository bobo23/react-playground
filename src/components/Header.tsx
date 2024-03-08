import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h2>React Playground</h2>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/tictactoe">Tic Tac Toe</Link>
          </li>
          <li className="nav-item">
            <Link to="/memory">Memory</Link>
          </li>
          <li className="nav-item">
            <Link to="/shopping-list">Shopping List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
