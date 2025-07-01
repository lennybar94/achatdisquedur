/* ---------- components/Header.jsx ---------- */
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="topnav">
      <a href="/" className="nav-logo">
      <img
      src="/logo.png" width="50px" height="50px"
      alt="Comparatif disque dur"
      className="logo-img"
      />
      </a>
      <a href="/comment-choisir-disque-dur">Comment choisir son disque dur ?</a>
      <a href="/a-propos">A propos</a>

      {/* bouton thème collé à droite */}
      <span style={{ marginLeft: 'auto' }}>
        <ThemeToggle />
      </span>
    </header>
  );
}
