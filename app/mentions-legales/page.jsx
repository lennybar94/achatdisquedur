// app/mentions-legales/page.jsx

export const metadata = {
  title: 'Mentions légales',
  description: 'Toutes les informations légales du site achatdisquedur.fr : éditeur, hébergeur (Vercel Inc.), droits d’auteur et politique d’affiliation.',
  alternates: { canonical: 'https://www.achatdisquedur.fr/mentions-legales' }
};

export default function MentionsLegales() {
  return (
    <main className="container">
      <h1>Mentions légales</h1>

      {/* --------- ÉDITEUR -------------------------------------------------- */}
      <h2>1. Éditeur du site</h2>
      <p>
        <strong>Nom&nbsp;:</strong> David Purkat<br />
        <strong>Adresse&nbsp;:</strong> 1 avenue Diderot, 94100 Saint-Maur-des-Fossés, France<br />
        <strong>Email&nbsp;:</strong>{' '}
        <a href="mailto:david.purkat@gmail.com">david.purkat@gmail.com</a><br />
                <strong>Responsable de la publication&nbsp;:</strong> David Purkat
      </p>

      {/* --------- HÉBERGEMENT --------------------------------------------- */}
      <h2>2. Hébergement</h2>
      <p>
        <strong>Prestataire&nbsp;:</strong> Vercel Inc.<br />
        <strong>Adresse&nbsp;:</strong> 440 N Barranca Ave, Suite 4133, Covina, CA 91723, États-Unis
        {/* Sources : Bloomberg & D&B :contentReference[oaicite:0]{index=0} */}
      </p>

      {/* --------- CRÉDITS -------------------------------------------------- */}
      <h2>3. Propriété intellectuelle</h2>
      <p>
        L’ensemble du contenu (textes, tableaux, code) est protégé par le Code de la propriété
        intellectuelle. Toute reproduction totale ou partielle sans autorisation écrite est
        interdite.
      </p>

      {/* --------- AFFILIATION --------------------------------------------- */}
      <h2>4. Affiliation Amazon</h2>
      <p>
        Achatdisquedur.fr participe au Programme Partenaires d’Amazon EU. En tant que Partenaire
        Amazon, le site réalise un bénéfice sur les achats remplissant les conditions requises. Tous
        les liens vers Amazon contiennent le tag partenaire <strong>addfr-21</strong> et portent
        l’attribut <code>rel="nofollow sponsored"</code>.
      </p>

      {/* --------- RESPONSABILITÉ ------------------------------------------ */}
      <h2>5. Responsabilité</h2>
      <p>
        Les informations fournies sont données à titre indicatif. Malgré les mises à jour
        régulières, des écarts de prix ou de disponibilité peuvent survenir. L’éditeur ne peut être
        tenu responsable d’un préjudice lié à l’utilisation du site ou à l’achat d’un produit
        référencé.
      </p>

      {/* --------- DONNÉES PERSONNELLES ------------------------------------ */}
      <h2>6. Données personnelles &amp; cookies</h2>
      <p>
        Achatdisquedur.fr ne recueille aucune donnée nominative ; seules des statistiques
        anonymisées sont mesurées via Plausible Analytics (RGPD-compliant, sans cookie). Vous
        bénéficiez d’un droit d’accès et de suppression en écrivant à l’adresse mentionnée ci-dessus.
      </p>

      {/* --------- LOI APPLICABLE ------------------------------------------ */}
      <h2>7. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de litige, les
        tribunaux compétents sont ceux du ressort de la Cour d’appel de Paris.
      </p>
    </main>
  );
}
