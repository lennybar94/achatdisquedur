// app/page.tsx
import { Metadata } from 'next';
import DiskTable from '../components/DiskTable';
import TypeSelector from '../components/TypeSelector';

type Props = { searchParams: { type?: string } };

const DESC_DEFAULT =
  'Comparatif en temps réel des disques durs, SSD, clés USB et cartes mémoire les plus vendus sur Amazon France.';

const TYPE_CONFIG: Record<string, { title: string; description: string; intro: string }> = {
  'HDD/SSD': {
    title: 'HDD & SSD – Achat Disque Dur',
    description:
      'Trouvez un disque dur HDD ou SSD au meilleur rapport qualité-prix. Comparatif des top ventes et liens directs vers Amazon.',
    intro:
      'Trouvez un disque dur HDD ou SSD au meilleur rapport qualité-prix grâce à notre comparatif Amazon 2025. Filtrez par capacité, interface et marque pour dénicher le modèle parfaitement adapté à vos besoins.',
  },
  'Disque Flash': {
    title: 'Clés USB – Achat Disque Dur',
    description:
      'Clés USB haute vitesse : comparez les meilleurs modèles du moment par capacité, marque et prix. Offres mises à jour en continu.',
    intro:
      'Comparez les clés USB haute vitesse les plus vendues sur Amazon 2025. Sélectionnez votre capacité, marque et prix, et accédez directement aux meilleures offres.',
  },
  'Carte Mémoire': {
    title: 'Cartes Mémoire – Achat Disque Dur',
    description:
      'Cartes SD et microSD classées par vitesse, capacité et compatibilité. Comparez les performances avant d’acheter sur Amazon.',
    intro:
      'Explorez notre classement des cartes SD et microSD les plus populaires sur Amazon 2025. Vitesse, capacité et compatibilité : tout est là pour faire le bon choix.',
  },
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const cfg = TYPE_CONFIG[searchParams.type || ''] ?? null;
  return {
    title: cfg?.title ?? 'Achat Disque Dur – meilleures ventes Amazon',
    description: cfg?.description ?? DESC_DEFAULT,
  };
}

export default function Home({ searchParams }: Props) {
  // On choisit le type depuis searchParams.type ou on retombe sur 'HDD/SSD'
  const kind = searchParams.type && TYPE_CONFIG[searchParams.type] ? searchParams.type : 'HDD/SSD';
  const intro = TYPE_CONFIG[kind].intro;

  return (
    <>

      <h1>Meilleures ventes de {kind}</h1>
      <p>{intro}</p>

      <h2>Tableau des meilleures ventes</h2>

      {/* Sélecteur de type pour piloter table et métadonnées */}
      <TypeSelector />

      <div className="table-wrapper">
        <DiskTable selectedKind={kind as 'HDD/SSD' | 'Disque Flash' | 'Carte Mémoire'} />
      </div>
    </>
  );
}
