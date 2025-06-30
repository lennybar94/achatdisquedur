// app/cgu/page.jsx

export const metadata = {
  title: 'Conditions générales d’utilisation (CGU)',
  description:
    'CGU du site achatdisquedur.fr : objet, accès au service, propriété intellectuelle, limitation de responsabilité, données personnelles et cookies.',
  alternates: { canonical: 'https://www.achatdisquedur.fr/cgu' }
};

export default function CGU() {
  return (
    <main className="container">
      <h1>Conditions générales d’utilisation</h1>

      {/* -------- 1. OBJET -------------------------------------------------- */}
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales d’utilisation (ci-après « CGU ») ont pour objet de
        définir les modalités d’accès et d’usage du site <strong>achatdisquedur.fr</strong>,
        édité par <strong>David Purkat</strong>, 1 avenue Diderot, 94100 Saint-Maur-des-Fossés,
        France (ci-après « l’Éditeur »).
      </p>

      {/* -------- 2. ACCEPTATION ------------------------------------------- */}
      <h2>2. Acceptation des CGU</h2>
      <p>
        La navigation sur le site implique l’acceptation sans réserve des présentes CGU par
        l’utilisateur. Celles-ci peuvent être modifiées à tout moment ; la version applicable est
        celle en ligne au moment de la consultation.
      </p>

      {/* -------- 3. SERVICES ---------------------------------------------- */}
      <h2>3. Services proposés</h2>
      <p>
        achatdisquedur.fr fournit :
      </p>
      <ul>
        <li>Un <strong>comparatif actualisé</strong> de disques durs internes et externes ;</li>
        <li>Des <strong>guides d’achat</strong> et conseils d’utilisation ;</li>
        <li>Des <strong>liens affiliés Amazon</strong> permettant la redirection vers la fiche
            produit officielle.</li>
      </ul>

      {/* -------- 4. PROPRIÉTÉ INTELLECTUELLE ------------------------------ */}
      <h2>4. Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus (textes, tableaux, code, logo) est protégé. Toute reproduction, même
        partielle, doit faire l’objet d’une autorisation écrite de l’Éditeur.
      </p>

      {/* -------- 5. RESPONSABILITÉ ---------------------------------------- */}
      <h2>5. Limitation de responsabilité</h2>
      <p>
        Les prix et stocks affichés proviennent de l’API Amazon Product Advertising et sont mis à
        jour toutes les 6 heures. Des écarts peuvent toutefois subsister ; l’utilisateur est invité
        à vérifier les informations avant tout achat. L’Éditeur ne saurait être tenu responsable
        d’un préjudice lié à ces variations.
      </p>

      {/* -------- 6. AFFILIATION ------------------------------------------- */}
      <h2>6. Programme d’affiliation Amazon</h2>
      <p>
        achatdisquedur.fr participe au Programme Partenaires d’Amazon EU. Les liens comportent le
        tag <strong>addfr-21</strong> et portent l’attribut <code>rel="nofollow sponsored"</code>.
      </p>

      {/* -------- 7. DONNÉES PERSONNELLES --------------------------------- */}
      <h2>7. Données personnelles &amp; cookies</h2>
      <p>
        Aucune donnée nominative n’est collectée. Les statistiques anonymisées sont mesurées via
        Plausible Analytics, conforme RGPD et sans cookie. Pour exercer vos droits (accès, effacement),
        contactez <a href="mailto:david.purkat@gmail.com">david.purkat@gmail.com</a>.
      </p>

      {/* -------- 8. DISPONIBILITÉ DU SITE -------------------------------- */}
      <h2>8. Disponibilité du service</h2>
      <p>
        Le site est normalement accessible 24 h/24 et 7 j/7, hors cas de force majeure ou
        maintenance. L’Éditeur se réserve le droit d’interrompre l’accès sans préavis.
      </p>

      {/* -------- 9. LIENS EXTERNES ---------------------------------------- */}
      <h2>9. Liens externes</h2>
      <p>
        Des liens vers des sites tiers (Amazon.fr) peuvent être présents. L’Éditeur n’exerce aucun
        contrôle sur leur contenu et décline toute responsabilité quant aux informations qui y sont
        publiées.
      </p>

      {/* -------- 10. DROIT APPLICABLE ------------------------------------- */}
      <h2>10. Droit applicable &amp; juridiction compétente</h2>
      <p>
        Les présentes CGU sont régies par le droit français. En cas de litige, les tribunaux
        compétents sont ceux du ressort de la Cour d’appel de Paris.
      </p>

      {/* -------- 11. CONTACT --------------------------------------------- */}
      <h2>11. Contact</h2>
      <p>
        Pour toute question, écrivez à{' '}
        <a href="mailto:david.purkat@gmail.com">david.purkat@gmail.com</a> ou à l’adresse
        postale indiquée ci-dessus.
      </p>
    </main>
  );
}
