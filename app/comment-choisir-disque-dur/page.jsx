export const metadata = {
  title: 'Comment choisir son disque dur, SSD, clé USB ou carte mémoire ?',
  description:
    'Guide 2025 accessible : comprendre les capacités, vitesses, connectiques et form-factors, avec des conseils pour débutants et experts.',
};

export default function Guide() {
  return (
    <article className="prose mx-auto p-4">
      <h1>Comment choisir son support de stockage ?</h1>
      <p className="lead">
        Que vous cherchiez un disque dur, un SSD, une clé USB ou une carte mémoire, trois grands critères
        guident votre choix : <strong>capacité</strong>, <strong>vitesse</strong> et <strong>connectique</strong>.
      </p>

      {/* SECTION HDD & SSD */}
      <section aria-labelledby="hdd-ssd">
        <h2 id="hdd-ssd">Disques durs (HDD) et SSD : le form-factor</h2>

        <p>
          Les <abbr title="Hard Disk Drive">HDD</abbr> existent principalement en 3,5″ (tour, NAS) ou 2,5″ (portable).
          Les SSD se déclinent :
        </p>
        <ul>
          <li><strong>M.2 NVMe 2280</strong> – ultrarapide (⩾3500 Mo/s), pour PC récents.</li>
          <li><strong>SATA 2,5″</strong> – bon marché, jusqu’à 550 Mo/s.</li>
          <li><strong>SSD externe USB-C</strong> – mobilité, USB 3.2 Gen 2 (10 Gb/s).</li>
        </ul>

        <aside className="callout info" role="note">
          <strong>Pour débutants :</strong> un HDD 3,5″ de 4 To à 7200 tr/min suffit pour des sauvegardes régulières.
        </aside>
        <aside className="callout tip" role="note">
          <strong>Pour experts :</strong> privilégiez un SSD NVMe Gen 4 équipé d’un dissipateur pour le montage 4K.
        </aside>
      </section>

      {/* SECTION CLÉS USB */}
      <section aria-labelledby="cles-usb">
        <h2 id="cles-usb">Clés USB : choix du protocole</h2>
        <p>
          Depuis USB 3.0, les appellations ont changé. Voici un tableau synthétique :
        </p>
        <table className="guide-table" aria-describedby="usb-desc">
          <caption id="usb-desc">Débit théorique et nom marketing des versions USB</caption>
          <thead>
            <tr>
              <th scope="col">Version</th>
              <th scope="col">Débit théorique</th>
              <th scope="col">Nom marketing</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>USB 2.0</td>        <td>480 Mb/s</td>   <td>High Speed</td></tr>
            <tr><td>USB 3.1 Gen 1</td>  <td>5 Gb/s</td>     <td>SuperSpeed</td></tr>
            <tr><td>USB 3.1 Gen 2</td>  <td>10 Gb/s</td>    <td>SuperSpeed+</td></tr>
            <tr><td>USB 3.2 Gen 2×2</td><td>20 Gb/s</td>    <td>SuperSpeed+ 20 Gb/s</td></tr>
            <tr><td>USB 4</td>          <td>40 Gb/s</td>    <td>Thunderbolt-equivalent</td></tr>
          </tbody>
        </table>

        <aside className="callout info">
          <strong>Astuce :</strong> misez sur un connecteur <em>USB-C</em> pour profiter du Power Delivery et de la compatibilité Thunderbolt.
        </aside>
        <aside className="callout tip">
          <strong>Pour experts :</strong> choisissez une clé NVMe intégrée pour des vitesses très proches du SSD interne.
        </aside>
      </section>

      {/* SECTION CARTES MÉMOIRE */}
      <section aria-labelledby="cartes-memoire">
        <h2 id="cartes-memoire">Cartes mémoire : SD, microSD, Compact Flash et plus</h2>
        <p>
          Les usages dictent le format : reflex 8K, drones ou consoles portables.
        </p>
        <ul>
          <li><strong>SDXC/SDUC</strong> – jusqu’à 128 To, UHS-II/III (Bus à 312/624 Mo/s).</li>
          <li><strong>microSD</strong> – smartphone, GoPro, Switch (UHS-I à 104 Mo/s).</li>
          <li><strong>Compact Flash</strong> (CFexpress) – caméras professionnelles 8K.</li>
        </ul>

        <aside className="callout info">
          <strong>Bon à savoir :</strong> les classes vidéo (V30/V60/V90) garantissent respectivement 30/60/90 Mo/s en écriture soutenue.
        </aside>
        <aside className="callout tip">
          <strong>Pour experts :</strong> privilégiez CFexpress Type B pour capturer en RAW 8K sans choke.
        </aside>
      </section>

      {/* RÉCAP GRAPHIQUE */}
      <section aria-labelledby="recap">
        <h2 id="recap">Récapitulatif rapide</h2>
        <table className="guide-table">
          <thead>
            <tr>
              <th scope="col">Support</th>
              <th scope="col">Usage recommandé</th>
              <th scope="col">Critère clé</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>HDD 3,5″</td>     <td>Archivage, NAS</td>            <td>&gt;8 To, 7200 tr/min</td></tr>
            <tr><td>SSD NVMe Gen 4</td><td>Montage vidéo, gaming</td>      <td>7000 Mo/s, M.2 2280</td></tr>
            <tr><td>Clé USB 4</td>     <td>Transfert express 40 Gb/s</td> <td>Type C, NVMe interne</td></tr>
            <tr><td>microSD V60</td>   <td>Drone, action-cam</td>         <td>UHS-I 100 Mo/s, A2</td></tr>
          </tbody>
        </table>
        <p>
          <strong>En bref :</strong>  
          1. Évaluez d’abord la <em>vitesse</em> requise,  
          2. vérifiez la <em>connectique</em>,  
          3. puis la <em>capacité</em> et enfin la <em>fiabilité de la marque</em>.
        </p>
      </section>
    </article>
  );
}
