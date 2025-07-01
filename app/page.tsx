export const metadata = {
  title: 'Achat Disque Dur – meilleures ventes Amazon',
  description: 'Comparatif en temps réel des disques durs, SSD, clés USB et cartes mémoire les plus vendus sur Amazon France.',
};

import DiskTable from '../components/DiskTable';

export default function Home() {
  return (
    <>
      <h1>Meilleures ventes de disques durs et SSD 2025</h1>

      <p>
        Découvrez en temps réel le top des supports de stockage Amazon 2025 : HDD internes & externes, SSD, clés USB et cartes mémoire.
      </p>

      <h3>Tableau des meilleures ventes</h3>

      <div className="table-wrapper">
        <DiskTable />
      </div>
    </>
  );
}
