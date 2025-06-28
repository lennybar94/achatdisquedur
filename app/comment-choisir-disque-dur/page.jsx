/* ---------- app/comment-choisir-disque-dur/page.jsx ---------- */

export const metadata = {
  title: 'Comment choisir son disque dur, SSD, clé USB ou carte mémoire ?',
  description:
    'Guide 2025 : comparer form-factors, vitesses USB 4 / 3.2 Gen2, formats SD, microSD, Compact Flash pour trouver le meilleur support de stockage.',
};

export default function Guide() {
  return (
    <>
      <h1>Comment choisir son disque dur ?</h1>

      <p>
        Qu’il s’agisse d’une <strong>clé USB</strong> pour vos fichiers nomades, d’un
        <strong> SSD NVMe</strong> pour accélérer votre PC, ou d’une
        <strong> carte mémoire</strong> pour votre appareil photo, le choix du support
        dépend de trois critères : <em>capacité</em>, <em>vitesse</em>, <em>connectique</em>.
      </p>

      {/* --------------------------------------------------------- */}
      <h2>Disques durs et SSD : penser « Form Factor »</h2>

      <p>
        Les formats 3,5″ (bureautique) et 2,5″ (portable) dominent encore côté
        <abbr title="Hard Disk Drive">HDD</abbr>. Les <strong>SSD</strong>, eux, se déclinent en :
      </p>

      <ul>
        <li><strong>M.2 2280 NVMe</strong> : 22 × 80 mm pour PC de bureau / laptop
          <em>ultra-rapides</em>.</li>
        <li><strong>SATA 2,5″</strong> : bon marché, compatible avec d’anciens ordinateurs.</li>
        <li><strong>Portable USB-C</strong> : SSD externe, format poche.</li>
      </ul>

      <blockquote>
        <strong>Astuce :</strong> préférez un SSD NVMe Gen4 pour le montage vidéo 4K ;
        un HDD 3,5″ de 8 To suffit pour la sauvegarde hebdomadaire.
      </blockquote>

      {/* --------------------------------------------------------- */}
      <h2>Clés USB : bien comprendre les protocoles</h2>

      <p>
        Une clé “USB 3.0” n’est plus un gage de vitesse en 2025. Voici le décodage :
      </p>

      <table className="guide-table">
        <thead>
          <tr>
            <th>Protocole</th>
            <th>Bande passante théorique</th>
            <th>Nom marketing (rappel)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>USB 2.0</td><td>480 Mb/s</td><td>High Speed</td></tr>
          <tr><td>USB 3.0 / 3.1 Gen1</td><td>5 Gb/s</td><td>SuperSpeed</td></tr>
          <tr><td>USB 3.1 Gen2</td><td>10 Gb/s</td><td>SuperSpeed +</td></tr>
          <tr><td>USB 3.2 Gen2×2</td><td>20 Gb/s</td><td>SuperSpeed + 20 Gb/s</td></tr>
          <tr><td>USB 4 (Gen 3×2)</td><td>40 Gb/s</td><td>équivalent Thunderbolt 3/4</td></tr>
        </tbody>
      </table>

      <ul>
        <li>
          <strong>Connecteur</strong> : privilégiez un port <em>USB-C</em>, compatible Power Delivery
          et affichage DisplayPort Alt-mode.
        </li>
        <li>
          <strong>Gen1 / Gen2</strong> indiquent le nombre de lignes 5 Gb/s
          – Gen2×2 double encore la bande passante.
        </li>
      </ul>

      {/* --------------------------------------------------------- */}
      <h2>Cartes mémoire : SD, microSD, Compact Flash, Gaming Console</h2>

      <p>
        Les appareils photo experts exigent souvent des <strong>CFexpress</strong>,
        tandis que la Nintendo Switch reste limitée aux cartes <strong>microSD UHS-I</strong>.
      </p>

      <h3>Formats courants</h3>
      <ul>
        <li><strong>SDXC / SDUC</strong> : jusqu’à 128 To, vitesse UHS-II / III possible.</li>
        <li><strong>microSD</strong> : smartphones, drones, consoles portables.</li>
        <li><strong>Compact Flash</strong> (CF, CFast, CFexpress) : reflex &amp; caméras 8K.</li>
      </ul>

      <blockquote>
        <strong>Bon à savoir :</strong> vérifiez le logo “V30 • V60 • V90” :  
        il garantit un débit vidéo minimum de 30, 60 ou 90 MB/s en écriture
        soutenue – indispensable pour la 4K/8K RAW.
      </blockquote>

      {/* --------------------------------------------------------- */}
      <h2>Tableau récapitulatif</h2>

      <table className="guide-table">
        <thead>
          <tr>
            <th>Support</th><th>Usage idéal</th><th>Points clés</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>HDD 3,5″</td>
            <td>Archivage, NAS</td>
            <td>&gt;16 To, 7200 tr/min, cache 256 Mo</td>
          </tr>
          <tr>
            <td>SSD NVMe Gen4</td>
            <td>Montage vidéo, gaming</td>
            <td>7000 MB/s, M.2 2280, dissipateur</td>
          </tr>
          <tr>
            <td>Clé USB 4</td>
            <td>Transferts express 40 Gb/s</td>
            <td>Connecteur USB-C, NVMe interne</td>
          </tr>
          <tr>
            <td>microSD V60</td>
            <td>Drone 5.4 K, GoPro</td>
            <td>UHS-I 160 MB/s, A2 Apps</td>
          </tr>
        </tbody>
      </table>

      <p>
        En résumé : <strong>déterminez la vitesse nécessaire</strong> avant la capacité,
        puis vérifiez la connectique (USB-C, UHS-II, NVMe) et enfin
        choisissez la marque la plus fiable dans votre budget.
      </p>
    </>
  );
}
