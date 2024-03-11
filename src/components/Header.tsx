import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import logo from '../assets/react.svg';

export default function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      {isMobile ? (
        <Menu right>
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/tictactoe" className={({ isActive }) => isActive ? "active" : ""}>Tic Tac Toe</NavLink>
          <NavLink to="/memory" className={({ isActive }) => isActive ? "active" : ""}>Memory</NavLink>
          <NavLink to="/shopping-list" className={({ isActive }) => isActive ? "active" : ""}>Shopping List</NavLink>
        </Menu>
      ) : (
        <div className="header">
          <div className="logo">
          <Link to="/">
              <img src={logo}/>
              <span>Playground</span>
          </Link>
        </div >
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
        </div>
      )}
    </header>
  );
}
