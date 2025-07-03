// app/layout.tsx
import './globals.css';
import Header from '../components/Header';
import { cookies } from 'next/headers';
import Script from 'next/script';
import { ReactNode } from 'react';

// vos métadonnées (Next gère <head> pour vous)
export const metadata = {
  title: 'Meilleures ventes de disques durs 2025',
  description: 'Tableau comparatif mis à jour – HDD, SSD, clés USB, cartes mémoire.',
  alternates: { canonical: 'https://www.achatdisquedur.fr' }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = cookies().get('theme')?.value === 'light' ? 'light' : 'dark';

  return (
    <body data-theme={theme}>
      <Header />
      <main className="container">{children}</main>
      <footer>
        <a href="/mentions-legales">Mentions légales</a> ·{' '}
        <a href="/politique-de-confidentialite">Politique de confidentialité</a> ·{' '}
        <a href="/cgu">CGU</a><br/>
        © {new Date().getFullYear()} – AchatDisqueDur.fr
      </footer>

      {/* Inlining du CSS critique */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root { /* vos variables critiques */ }
            body { /* styles de base */ }
            .topnav { /* … */ }
            .filter-toggle { /* … */ }
          `
        }}
      />

      {/* Chargement différé de votre CSS complet */}
      <link
        rel="stylesheet"
        href="/_next/static/css/db445df6943b3dd9.css"
        media="print"
        data-id="deferred-styles"
      />
      <Script id="hydrate-styles" strategy="afterInteractive">
        {`
          (function(){
            var l = document.querySelector('link[data-id="deferred-styles"]');
            if (l) l.media = 'all';
          })();
        `}
      </Script>

      {/* Plausible */}
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="achatdisquedur.fr"
        strategy="lazyOnload"
      />
    </body>
  );
}
