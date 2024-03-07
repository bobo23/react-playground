export default function Header() {
  return (
    <header className="header">
      <h2>React Playground</h2>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about">Über Uns</a>
          </li>
          <li className="nav-item">
            <a href="/contact">Kontakt</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
