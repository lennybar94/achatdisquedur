/* ---------- components/Header.jsx ---------- */
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="topnav" role="banner">
      <nav className="container flex items-center" aria-label="Navigation principale">
        <ul className="flex gap-6 list-none p-0 m-0">
          <li><a href="/" className="nav-link">Comparatif disques durs</a></li>
          <li><a href="/comment-choisir-disque-dur" className="nav-link">Comment choisir son disque dur ?</a></li>
          <li><a href="/a-propos" className="nav-link">À propos</a></li>
        </ul>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
