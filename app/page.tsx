export const metadata = {
  title: 'Achat Disque Dur – meilleures ventes Amazon',
  description: 'Comparatif en temps réel des disques durs, SSD, clés USB et cartes mémoire les plus vendus sur Amazon France.',
};

import DiskTable from '../components/DiskTable';
import TypeSelector from '../components/TypeSelector';

export default function Home() {
  return (
    <>
      <h1>Meilleures ventes de disques durs et SSD 2025</h1>

      <p>
        Découvrez en temps réel le top des supports de stockage Amazon 2025 : HDD internes & externes, SSD, clés USB et cartes mémoire.
      </p>
      <br />
      <p>
      Que vous soyez un professionnel à la recherche d’une solution fiable pour vos sauvegardes, un gamer souhaitant des temps de chargement ultra-rapides, ou simplement un utilisateur occasionnel ayant besoin d’espace supplémentaire, notre comparatif passe en revue les marques phares (Seagate, Western Digital, Samsung, Kingston, SanDisk, Toshiba…), les formats (2,5″, 3,5″, USB-C, microSD), ainsi que les interfaces (SATA III, USB 3.2 Gen2, NVMe).
      </p>

      <h2>Tableau des meilleures ventes</h2>

      <div className="table-wrapper">
        <DiskTable />
      </div>
    </>
  );
}
