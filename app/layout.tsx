import './globals.css';
import Header from '../components/Header';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

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
