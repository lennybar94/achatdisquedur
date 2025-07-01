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
        Retrouvez ci-dessous le <strong>classement en temps réel</strong> des périphériques
        de stockage les plus vendus sur Amazon : HDD, SSD externes et internes, clés USB, cartes mémoire.
      </p>

      <h3>Tableau des meilleures ventes</h3>

      <div className="table-wrapper">
        <DiskTable />
      </div>
    </>
  );
}
