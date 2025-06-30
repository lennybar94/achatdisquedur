/* ---------- app/politique-de-confidentialite/page.jsx ---------- */
export const metadata = {
  title: 'Politique de confidentialité – achatdisquedur.fr',
  description:
    'Informations sur la collecte des données, les cookies, les liens affiliés Amazon et vos droits RGPD.',
};

export default function Privacy() {
  return (
    <>
      <h1>Politique de confidentialité</h1>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le site <strong>achatdisquedur.fr</strong> est édité par&nbsp;:
        <br />
        David&nbsp;Purkat – 1&nbsp;avenue Diderot, 94100&nbsp;Saint-Maur-des-Fossés,
        France. <br />
        Contact&nbsp;: david.purkat&nbsp;[at]&nbsp;gmail.com
      </p>

      <h2>2. Données collectées</h2>
      <ul>
        <li>
          <strong>Visites</strong> : nous utilisons&nbsp;
          Plausible&nbsp;Analytics, un outil sans cookies ni identifiant
          personnel.
        </li>
        <li>
          <strong>Liens d’affiliation Amazon</strong> : lorsqu’un visiteur
          clique sur un lien, Amazon peut déposer des cookies pour suivre la
          transaction. Nous ne recevons aucune donnée personnelle issue de ces
          cookies.
        </li>
      </ul>

      <h2>3. Finalités et bases légales</h2>
      <table className="guide-table">
        <thead>
          <tr>
            <th>Finalité</th>
            <th>Données</th>
            <th>Base légale</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Statistiques de fréquentation</td>
            <td>Pages vues, appareil, pays</td>
            <td>Intérêt légitime (art.&nbsp;6-1 f RGPD)</td>
          </tr>
          <tr>
            <td>Suivi des ventes affiliées</td>
            <td>Identifiant Amazon (cookie)</td>
            <td>Contrat d’affiliation (art.&nbsp;6-1 b)</td>
          </tr>
          <tr>
            <td>Réponse aux messages</td>
            <td>Adresse e-mail, contenu</td>
            <td>Consentement (art.&nbsp;6-1 a)</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Cookies</h2>
      <p>
        Le site n’utilise pas de cookies de suivi marketing propres.
        Les cookies susceptibles d’être installés proviennent&nbsp;:
      </p>
      <ul>
        <li>
          d’<strong>Amazon.fr</strong> lorsque vous cliquez sur un produit&nbsp;;
        </li>
        <li>
          de votre choix de thème
          (clair/sombre) : cookie <code>theme</code>, durée 12 mois.
        </li>
      </ul>

      <h2>5. Destinataires</h2>
      <p>
        Les seules données envoyées à des tiers sont les statistiques
        agrégées (Plausible) et l’identifiant de suivi (Amazon).
      </p>

      <h2>6. Durées de conservation</h2>
      <ul>
        <li>
          Logs Plausible : 24 mois (agrégées, sans IP ni User-ID).
        </li>
        <li>
          Messages : 3 ans après dernier contact.
        </li>
        <li>
          Cookie <code>theme</code> : 12 mois.
        </li>
      </ul>

      <h2>7. Vos droits</h2>
      <p>
        Conformément au RGPD, vous pouvez accéder, rectifier ou supprimer vos
        données. Envoyez votre demande à&nbsp;
        <a href="mailto:contact@achatdisquedur.fr">contact@achatdisquedur.fr</a>.
      </p>

      <h2>8. Contact CNIL</h2>
      <p>
        Si vous estimez que vos droits ne sont pas respectés, vous pouvez
        introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>
    </>
  );
}
