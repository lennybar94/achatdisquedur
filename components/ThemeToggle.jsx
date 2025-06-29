/* ThemeToggle.jsx (ou .tsx) */
'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  /* lecture initiale : cookie -> fallback localStorage -> media query */
  useEffect(() => {
    const cookieMatch = document.cookie.match(/(?:^|; )theme=(light|dark)/);
    const stored = cookieMatch ? cookieMatch[1]
      : localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefers ? 'light' : 'dark');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  function apply(next){
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    /*  1 an - path=/  */
    document.cookie = `theme=${next};path=/;max-age=31536000`;
    localStorage.setItem('theme', next);
  }

  return (
    <button
      aria-label="Changer le thème"
      onClick={() => apply(theme === 'dark' ? 'light' : 'dark')}
      className="theme-btn"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
}
