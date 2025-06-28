'use client';
import { useEffect, useMemo, useState, Fragment } from 'react';
import Head from 'next/head';

/* ------------------------------------------------------------------ */
/*  Typage du produit                                                */
/* ------------------------------------------------------------------ */
type Disk = {
  asin: string;
  title: string;
  brand: string;
  capacity_gb: number;
  interface: string;
  storage_type:
    | 'HDD Interne' | 'HDD Externe'
    | 'SSD Interne' | 'SSD Externe'
    | 'Clé USB'     | 'Carte Mémoire';
  disk_type: 'HDD/SSD' | 'Disque Flash' | 'Carte Mémoire';
  form_factor_protocol: string;
  url_affiliate: string;
  rank: number;
};

/* ------------------------------------------------------------------ */
export default function DiskTable() {
  const [data, setData] = useState<Disk[]>([]);

  /* filtres -------------------------------------------------------- */
  const [selectedBrands,  setSelectedBrands]  = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(new Set());
  const [selectedKind,    setSelectedKind]    = useState<'HDD/SSD' | 'Disque Flash' | 'Carte Mémoire'>('HDD/SSD');
  const [minCap, setMinCap] = useState<number>(0);
  const [maxCap, setMaxCap] = useState<number>(Infinity);

  /* tri ------------------------------------------------------------ */
  type SortKey =
    'title' | 'brand' | 'storage_type'
  | 'capacity_gb' | 'interface' | 'form_factor_protocol';

  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [ascending, setAscending] = useState<boolean>(true);

  const [showFilters, setShowFilters] = useState<boolean>(false);

  /* ----------------------------------------------------------------
     1. Chargement : on fusionne HDD/SSD + Clés USB + Cartes mémoire
  ----------------------------------------------------------------- */
  useEffect(() => {
    fetch('/api/disks')
      .then(r => r.json())
      .then((arr:any[]) => setData(arr.map((d,i)=>({ ...d, rank:i+1 }))))
      .catch(console.error);
  }, []);

  /* réinitialise les sous-filtres lorsque le type change ---------- */
  useEffect(() => {
    setSelectedBrands(new Set());
    setSelectedStorage(new Set());
    setMinCap(0);
    setMaxCap(Infinity);
  }, [selectedKind]);

  /* sous-ensemble correspondant au type sélectionné --------------- */
  const dataByKind = useMemo(
    () => data.filter(d => d.disk_type === selectedKind),
    [data, selectedKind]
  );

  /* valeurs uniques pour Marque / Stockage ------------------------ */
  const { brands, storageTypes } = useMemo(() => {
    const b=new Set<string>(), s=new Set<string>();
    dataByKind.forEach(d => { b.add(d.brand); s.add(d.storage_type); });
    return { brands:[...b].sort(), storageTypes:[...s].sort() };
  }, [dataByKind]);

  /* filtrage + tri ------------------------------------------------- */
  const displayed = useMemo(() => {
    let arr = dataByKind
      .filter(d => selectedBrands.size   ? selectedBrands.has(d.brand)         : true)
      .filter(d => selectedStorage.size ? selectedStorage.has(d.storage_type) : true)
      .filter(d => {
        const tb=d.capacity_gb/1000;
        return tb>=minCap && tb<=maxCap;
      });

    if (sortKey){
      const mult=ascending?1:-1;
      arr = arr.slice().sort((a,b)=>{
        if(sortKey==='capacity_gb') return mult*(a.capacity_gb-b.capacity_gb);
        return mult*(a as any)[sortKey].localeCompare((b as any)[sortKey],'fr',{sensitivity:'base'});
      });
    }
    return arr;
  }, [dataByKind, selectedBrands, selectedStorage, minCap, maxCap, sortKey, ascending]);

  /* JSON-LD (20 premiers) ----------------------------------------- */
  const jsonLd = displayed.slice(0,20).map(d => ({
    '@context':'https://schema.org',
    '@type':'Product',
    name:d.title,
    brand:{'@type':'Brand',name:d.brand},
    offers:{'@type':'Offer',url:d.url_affiliate,priceCurrency:'EUR',availability:'https://schema.org/InStock'},
    additionalProperty:[{ '@type':'PropertyValue', name:'FormFactor/Protocol', value:d.form_factor_protocol }]
  }));

  /* gestion tri ---------------------------------------------------- */
  function handleSort(key:SortKey){
    if(key===sortKey) setAscending(!ascending);
    else { setSortKey(key); setAscending(true); }
  }

  /* options fixes du sélecteur ------------------------------------ */
  const diskOptions = [
    { label:'HDD/SSD',       value:'HDD/SSD'      },
    { label:'Clé USB',       value:'Disque Flash' },
    { label:'Carte Mémoire', value:'Carte Mémoire'}
  ] as const;

  /* ---------------------------------------------------------------- */
  return (
    <Fragment>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
      </Head>

      {/* Barre supérieure : sélecteur + lien filtrage --------------- */}
      <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.5rem'}}>
        {/* Sélecteur à gauche */}
        <span style={{display:'flex',alignItems:'center',gap:'.5rem',fontWeight:600,color:'var(--primary-400)'}}>
          <span>Type de disques&nbsp;:</span>
          <select
            className="select"
            value={selectedKind}
            onChange={e=>setSelectedKind(e.target.value as typeof selectedKind)}
          >
            {diskOptions.map(o=>(
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </span>

        {/* Lien Filtres amélioré */}
        <a
          onClick={()=>setShowFilters(!showFilters)}
          className="filter-toggle"
          style={{cursor:'pointer'}}
        >
          {showFilters ? 'Fermer les filtres' : 'Filtres'}
        </a>
      </div>

      {/* Panneau filtres -------------------------------------------- */}
      {showFilters && (
        <aside className="filter-panel">
          {/* Marque (2 colonnes) */}
          <div className="filter-box">
            <h3>Marque</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0.25rem 0.75rem'}}>
              {brands.map(b=>(
                <label key={b} style={{display:'flex',alignItems:'center'}}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.has(b)}
                    onChange={e=>{
                      const c=new Set(selectedBrands);
                      e.target.checked?c.add(b):c.delete(b);
                      setSelectedBrands(c);
                    }}
                  /> {b}
                </label>
              ))}
            </div>
          </div>

          {/* Type de stockage */}
          <div className="filter-box">
            <h3>Type de stockage</h3>
            {storageTypes.map(t=>(
              <label key={t}>
                <input
                  type="checkbox"
                  checked={selectedStorage.has(t)}
                  onChange={e=>{
                    const c=new Set(selectedStorage);
                    e.target.checked?c.add(t):c.delete(t);
                    setSelectedStorage(c);
                  }}
                /> {t}
              </label>
            ))}
          </div>

          {/* Capacité */}
          <div className="filter-box">
            <h3>Capacité (To)</h3>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              <input
                className="input"
                type="number"
                min={0}
                placeholder="Min"
                onChange={e => setMinCap(+e.target.value || 0)}
              />
              <input
                className="input"
                type="number"
                min={0}
                placeholder="Max"
                onChange={e => setMaxCap(+e.target.value || Infinity)}
              />
            </div>
          </div>
      </aside>
      )}

      {/* Tableau principal ------------------------------------------ */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th onClick={()=>handleSort('title')} className="sortable">Désignation {sortKey==='title'&&(ascending?'▲':'▼')}</th>
              <th onClick={()=>handleSort('storage_type')} className="sortable">Stockage {sortKey==='storage_type'&&(ascending?'▲':'▼')}</th>
              <th onClick={()=>handleSort('capacity_gb')} className="sortable">Capacité {sortKey==='capacity_gb'&&(ascending?'▲':'▼')}</th>
              <th onClick={()=>handleSort('interface')} className="sortable">Interface {sortKey==='interface'&&(ascending?'▲':'▼')}</th>
              <th onClick={()=>handleSort('form_factor_protocol')} className="sortable">Form Factor / Protocol {sortKey==='form_factor_protocol'&&(ascending?'▲':'▼')}</th>
              <th onClick={()=>handleSort('brand')} className="sortable">Marque {sortKey==='brand'&&(ascending?'▲':'▼')}</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((d,idx)=>{
              const medal = idx===0?'🥇':idx===1?'🥈':idx===2?'🥉':idx+1;
              const capacity =
                d.capacity_gb>=1000
                  ?(d.capacity_gb/1000).toFixed(1).replace(/\\.0$/,'')+' To'
                  :d.capacity_gb+' Go';
              return(
                <tr key={d.asin}>
                  <td>{medal}</td>
                  <td style={{textAlign:'left'}}>
                    <a href={d.url_affiliate} target="_blank" rel="nofollow sponsored">{d.title}</a>
                  </td>
                  <td>{d.storage_type}</td>
                  <td>{capacity}</td>
                  <td>{d.interface}</td>
                  <td>{d.form_factor_protocol}</td>
                  <td>{d.brand}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
