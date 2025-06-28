"use client";
import React, { useEffect, useMemo, useState, Fragment } from 'react';
import Head from 'next/head';
import manualProducts from '../data/manualProducts.json';
import manualUSB from '../data/manualUSB.json';
import manualCM from '../data/manualCM.json';

type Disk = typeof manualProducts[number];

export default function DiskTable() {
  const [data, setData] = useState<Disk[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(new Set());
  const [selectedKind, setSelectedKind] = useState<'HDD/SSD' | 'Disque Flash' | 'Carte Mémoire'>('HDD/SSD');
  const [minCap, setMinCap] = useState<number>(0);
  const [maxCap, setMaxCap] = useState<number>(Infinity);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [ascending, setAscending] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);

 useEffect(() => {
  let source;
  switch (selectedKind) {
    case 'Disque Flash':
      source = manualUSB;
      break;
    case 'Carte Mémoire':
      source = manualCM;
      break;
    default:
      source = manualProducts;
  }
  setData(source.map((d, i) => ({ ...d, rank: i + 1 })));
}, [selectedKind]);


  useEffect(() => {
    // reset filters on kind change
    setSelectedBrands(new Set());
    setSelectedStorage(new Set());
    setMinCap(0); setMaxCap(Infinity);
    setCurrentPage(1);
  }, [selectedKind]);

  const dataByKind = useMemo(
    () => data.filter(d => d.disk_type === selectedKind),
    [data, selectedKind]
  );

  const { brands, storageTypes } = useMemo(() => {
    const b = new Set<string>(), s = new Set<string>();
    dataByKind.forEach(d => { b.add(d.brand); s.add(d.storage_type); });
    return { brands: [...b].sort(), storageTypes: [...s].sort() };
  }, [dataByKind]);

  const displayed = useMemo(() => {
    let arr = dataByKind
      .filter(d => selectedBrands.size ? selectedBrands.has(d.brand) : true)
      .filter(d => selectedStorage.size ? selectedStorage.has(d.storage_type) : true)
      .filter(d => {
        const tb = d.capacity_gb / 1000;
        return tb >= minCap && tb <= maxCap;
      });
    if (sortKey) {
      const mult = ascending ? 1 : -1;
      arr = arr.slice().sort((a, b) => {
        if (sortKey === 'capacity_gb') return mult * (a.capacity_gb - b.capacity_gb);
        return mult * String((a as any)[sortKey]).localeCompare((b as any)[sortKey], 'fr', { sensitivity: 'base' });
      });
    }
    return arr;
  }, [dataByKind, selectedBrands, selectedStorage, minCap, maxCap, sortKey, ascending]);

  // Pagination logic
  const totalPages = Math.ceil(displayed.length / itemsPerPage) || 1;
  const pagedData = displayed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleSort(key: string) {
    if (key === sortKey) setAscending(!ascending);
    else { setSortKey(key); setAscending(true); }
  }

  const diskOptions = [
    { label: 'HDD/SSD', value: 'HDD/SSD' },
    { label: 'Clé USB', value: 'Disque Flash' },
    { label: 'Carte Mémoire', value: 'Carte Mémoire' }
  ] as const;

  return (
    <Fragment>
      <Head><title>Meilleures ventes de disques durs et SSD 2025</title></Head>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontWeight: 600, color: 'var(--primary-400)' }}>
          <span>Type de disques :</span>
          <select className="select" value={selectedKind} onChange={e => setSelectedKind(e.target.value as any)}>
            {diskOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </span>
        <a onClick={() => setShowFilters(!showFilters)} className="filter-toggle" style={{ cursor: 'pointer' }}>
          {showFilters ? 'Fermer les filtres' : 'Filtres'}
        </a>
        <select className="select" style={{ marginLeft: 'auto' }} value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={30}>30 par page</option>
          <option value={50}>50 par page</option>
        </select>
      </div>
      {showFilters && (
        <aside className="filter-panel">{/* filters as before */}
          {/* Marque */}
          <div className="filter-box"><h3>Marque</h3><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.25rem .75rem' }}>
            {brands.map(b => <label key={b}><input type="checkbox" checked={selectedBrands.has(b)} onChange={e => { const c = new Set(selectedBrands); e.target.checked ? c.add(b) : c.delete(b); setSelectedBrands(c); }} /> {b}</label>) }
          </div></div>
          {/* Stockage */}
          <div className="filter-box"><h3>Type de stockage</h3>{storageTypes.map(t => <label key={t}><input type="checkbox" checked={selectedStorage.has(t)} onChange={e => { const c = new Set(selectedStorage); e.target.checked ? c.add(t) : c.delete(t); setSelectedStorage(c); }} /> {t}</label>)}</div>
          {/* Capacité */}
          <div className="filter-box"><h3>Capacité (To)</h3><div style={{ display: 'flex', gap: '.5rem' }}>
            <input className="input" type="number" min={0} placeholder="Min" onChange={e => setMinCap(+e.target.value || 0)} />
            <input className="input" type="number" min={0} placeholder="Max" onChange={e => setMaxCap(+e.target.value || Infinity)} />
          </div></div>
        </aside>
      )}
      <div className="table-wrapper">
        <table className="table">
          <thead><tr>
            <th></th>
            <th onClick={() => handleSort('title')} className="sortable">Désignation {sortKey === 'title' && (ascending ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('storage_type')} className="sortable">Stockage {sortKey === 'storage_type' && (ascending ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('capacity_gb')} className="sortable">Capacité {sortKey === 'capacity_gb' && (ascending ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('interface')} className="sortable">Interface {sortKey === 'interface' && (ascending ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('form_factor_protocol')} className="sortable">{selectedKind === 'HDD/SSD' ? 'Form Factor' : 'Protocol'} {sortKey === 'form_factor_protocol' && (ascending ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('brand')} className="sortable">Marque {sortKey === 'brand' && (ascending ? '▲' : '▼')}</th>
          </tr></thead>
          <tbody>
            {pagedData.map((d, idx) => {
              const medal = idx === 0 && currentPage === 1 ? '🥇' : idx === 1 && currentPage === 1 ? '🥈' : idx === 2 && currentPage === 1 ? '🥉' : (currentPage - 1) * itemsPerPage + idx + 1;
              const capacity = d.capacity_gb >= 1000 ? (d.capacity_gb / 1000).toFixed(1).replace(/\.0$/, '') + ' To' : d.capacity_gb + ' Go';
              return (<tr key={d.asin}><td>{medal}</td><td style={{ textAlign: 'left' }}><a href={d.url_affiliate} target="_blank" rel="nofollow sponsored">{d.title}</a></td><td>{d.storage_type}</td><td>{capacity}</td><td>{d.interface}</td><td>{d.form_factor_protocol}</td><td>{d.brand}</td></tr>);
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} className={page === currentPage ? 'active' : ''} onClick={() => setCurrentPage(page)}>{page}</button>
        ))}
      </div>
    </Fragment>
  );
}
