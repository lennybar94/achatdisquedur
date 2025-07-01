import './globals.css';
import Header from '../components/Header';
import { cookies } from 'next/headers';
import Script from 'next/script';

export const metadata = {
  title: 'Meilleures ventes de disques durs 2025',
  description: 'Tableau comparatif mis à jour – HDD, SSD, clés USB, cartes mémoire.',
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const theme = cookies().get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="fr" data-theme={theme}>
      <head>
        {/* 1. Inliner les styles critiques */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg-900: #0f172a;
                --bg-800: #1e293b;
                --text-100: #f8fafc;
                --primary-500: #6366f1;
                --accent-500: #0ea5e9;
              }
              body {
                background: var(--bg-900);
                color: var(--text-100);
                font-family: 'Inter', sans-serif;
                line-height: 1.65;
              }
              .topnav {
                display: flex;
                align-items: center;
                background: var(--bg-800);
                padding: .85rem 1rem;
                border-bottom: 1px solid var(--border);
              }
              .topnav a {
                color: var(--text-100);
                font-weight: 600;
                text-decoration: none;
              }
              .filter-toggle {
                color: var(--accent-500);
                font-weight: 600;
                text-decoration: underline;
              }
            `,
          }}
        />
        {/* 2. Charger la feuille complète de façon non bloquante */}
        <link
          rel="stylesheet"
          href="/_next/static/css/db445df6943b3dd9.css"
          media="print"
          onLoad="this.media='all'"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Optionnel : */}
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        {/* ---------- FOOTER mis à jour ---------- */}
        <footer>
          <a href="/mentions-legales">Mentions légales</a> ·{' '}
          <a href="/politique-de-confidentialite">Politique de confidentialité</a> ·{' '}
          <a href="/cgu">CGU</a><br />
          © {new Date().getFullYear()} – AchatDisqueDur.fr
        </footer>

        {/* --- Plausible Analytics --------------------------------- */}
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="achatdisquedur.fr"
          strategy="lazyOnload"           /* équivalent defer */
        />
      </body>
    </html>
  );
}
