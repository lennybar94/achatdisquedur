/* ---------- components/Header.jsx ---------- */
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="topnav">
      <a href="/">Comparatif disques durs</a>
      <a href="/comment-choisir-disque-dur">Comment choisir son disque dur ?</a>
      <a href="/a-propos">A propos</a>

      {/* bouton thème collé à droite */}
      <span style={{ marginLeft: 'auto' }}>
        <ThemeToggle />
      </span>
    </header>
  );
}
