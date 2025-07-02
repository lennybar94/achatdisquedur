
import './globals.css';
import Header from '../components/Header';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Meilleures ventes de disques durs 2025',
  description: 'Tableau comparatif mis à jour – HDD, SSD, clés USB, cartes mémoire.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = cookies().get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang="fr" data-theme={theme}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        {/* Inliner les styles critiques */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --bg-900: #0f172a;
                --bg-800: #1e293b;
                --text-100: #f8fafc;
                --primary-500: #6366f1;
                --accent-500: #0ea5e9;
                --border: #334155;
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

        {/* Chargement différé de la CSS complète */}
        <link
          rel="stylesheet"
          href="/_next/static/css/db445df6943b3dd9.css"
          media="print"
          data-id="deferred-styles"
        />
      <script src="https://analytics.ahrefs.com/analytics.js" data-key="Ddha1CleqIHpnx3r5tc8uA" async></script>
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>

        {/* ---------- FOOTER mis à jour ---------- */}
        <footer>
          <a href="/mentions-legales">Mentions légales</a> ·{' '}
          <a href="/politique-de-confidentialite">Politique de confidentialité</a> ·{' '}
          <a href="/cgu">CGU</a>
          <br />
          © {new Date().getFullYear()} – AchatDisqueDur.fr
        </footer>

        {/* Hydratation du CSS différé après rendu initial */}
        <Script id="hydrate-styles" strategy="afterInteractive">
          {`(function(){
            var l = document.querySelector('link[data-id="deferred-styles"]');
            if(l) l.media = 'all';
          })();`}
        </Script>

        {/* --- Plausible Analytics --------------------------------- */}
        <Script
          src="https://plausible.io/js/script.js"
          data-domain="achatdisquedur.fr"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
