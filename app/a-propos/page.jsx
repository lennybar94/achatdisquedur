/* ---------- app/a-propos/page.jsx ---------- */
export const metadata = {
  title: 'À propos – AchatDisqueDur.fr',
  description:
    'Découvrez la mission du site AchatDisqueDur.fr : aider les utilisateurs à choisir le meilleur support de stockage grâce à un comparatif mis à jour en temps réel et des guides pratiques.',
};

export default function About() {
  return (
    <>
      <h1>À propos d’AchatDisqueDur.fr</h1>

      <p>
        <strong>AchatDisqueDur.fr</strong> est un comparateur indépendant
        entièrement dédié aux supports de stockage&nbsp;: disques durs HDD,
        SSD internes ou externes, clés USB et cartes mémoire. Notre objectif ?
        Vous faire gagner du temps (et de l’argent) en affichant&nbsp;:
      </p>

      <ul>
        <li>Les <em>meilleures ventes Amazon</em> actualisées chaque jour&nbsp;;</li>
        <li>Des <strong>filtres dynamiques</strong> (marque, type, capacité) pour
            trouver le produit idéal&nbsp;;</li>
        <li>Un <strong>guide d’achat</strong> complet expliquant form factors,
            protocoles USB, normes SD…&nbsp;;</li>
        <li>Des <strong>liens d’affiliation</strong> transparents (<span
              style={{ whiteSpace: 'nowrap' }}>tag addfr-21</span>) afin de financer le
            service sans publicité intrusive.</li>
      </ul>

      <h2>Transparence &amp; confidentialité</h2>
      <p>
        AchatDisqueDur.fr utilise Plausible Analytics, un outil sans cookies,
        respectueux du <abbr title="Règlement Général sur la Protection des Données">RGPD</abbr>.
        Les seuls cookies tiers sont déposés par Amazon lors d’un clic sur un
        lien produit. Consultez notre&nbsp;
        <a href="/politique-de-confidentialite">Politique de confidentialité</a>
        &nbsp;pour plus de détails.
      </p>

      <h2>Qui suis-je ?</h2>
      <p>
        Le site est édité par <strong>David Purkat</strong>.
        Vous pouvez me contacter à&nbsp;: &nbsp;
        <a href="mailto:david.purkat@gmail.com">david.purkat@gmail.com</a>.
      </p>

      <p>Bonne visite !</p>
    </>
  );
}
