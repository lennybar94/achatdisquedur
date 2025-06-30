"use client";
import React, { useEffect, useMemo, useState, Fragment } from 'react';
import Head from 'next/head';
import manualProducts from '../data/manualProducts.json';
import manualUSB from '../data/manualUSB.json';
import manualCM from '../data/manualCM.json';

type Disk = typeof manualProducts[number] | typeof manualUSB[number] | typeof manualCM[number];

export default function DiskTable() {
  const [data, setData] = useState<Disk[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(new Set());
  const [selectedInterface, setSelectedInterface] = useState<Set<string>>(new Set());
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
    let source: Disk[];
    if (selectedKind === 'Disque Flash') source = manualUSB;
    else if (selectedKind === 'Carte Mémoire') source = manualCM;
    else source = manualProducts;
    setData(source.map((d, i) => ({ ...d, rank: i + 1 })));
  }, [selectedKind]);

  useEffect(() => {
    setSelectedBrands(new Set());
    setSelectedStorage(new Set());
    setSelectedInterface(new Set());
    setMinCap(0);
    setMaxCap(Infinity);
    setCurrentPage(1);
  }, [selectedKind]);

  const dataByKind = useMemo(() =>
    data.filter(d => d.disk_type === selectedKind),
    [data, selectedKind]
  );

  const { brands, storageTypes, interfaces } = useMemo(() => {
    const b = new Set<string>();
    const s = new Set<string>();
    const iface = new Set<string>();
    dataByKind.forEach(d => { b.add(d.brand); s.add(d.storage_type); iface.add(d.interface); });
    return {
      brands: [...b].sort(),
      storageTypes: [...s].sort(),
      interfaces: [...iface].sort()
    };
  }, [dataByKind]);

  const displayed = useMemo(() => {
    let arr = dataByKind
      .filter(d => selectedBrands.size ? selectedBrands.has(d.brand) : true)
      .filter(d => selectedKind === 'HDD/SSD'
        ? (selectedStorage.size ? selectedStorage.has(d.storage_type) : true)
        : (selectedInterface.size ? selectedInterface.has(d.interface) : true)
      )
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
  }, [dataByKind, selectedBrands, selectedStorage, selectedInterface, minCap, maxCap, sortKey, ascending, selectedKind]);

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
          <a onClick={() => setShowFilters(!showFilters)} className="filter-toggle" style={{ cursor: 'pointer' }}>
            {showFilters ? 'Fermer les filtres' : 'Filtres'}
          </a>
        </span>
        <select className="select" style={{ marginLeft: 'auto' }} value={itemsPerPage} onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={30}>30 par page</option>
          <option value={50}>50 par page</option>
        </select>
      </div>

      {showFilters && (
        <aside className="filter-panel">
          {/* Marque */}
          <div className="filter-box"><h3>Marque</h3><div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '.25rem .75rem' }}>
            {brands.map(b => <label key={b}><input type="checkbox" checked={selectedBrands.has(b)} onChange={e => { const c = new Set(selectedBrands); e.target.checked ? c.add(b) : c.delete(b); setSelectedBrands(c); setCurrentPage(1);} } /> {b}</label>)}
          </div></div>

          {/* Conditional filter */}
          <div className="filter-box"><h3>{(selectedKind === 'HDD/SSD' || selectedKind === 'Carte Mémoire') ? 'Type de stockage' : 'Interface'}</h3>
            {(selectedKind === 'HDD/SSD' || selectedKind === 'Carte Mémoire') ? (
          <div className="filter-box">
            <h3>Type de stockage</h3>
            {storageTypes.map(item => (
              <label key={item} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedStorage.has(item)}
                  onChange={e => {
                    const c = new Set(selectedStorage);
                    e.target.checked ? c.add(item) : c.delete(item);
                    setSelectedStorage(c);
                    setCurrentPage(1);
                  }}
                />
                {item}
              </label>
            ))}
          </div>
        ) : (
          <div className="filter-box">
            <h3>Interface</h3>
            {interfaces.map(item => (
              <label key={item} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedInterface.has(item)}
                  onChange={e => {
                    const c = new Set(selectedInterface);
                    e.target.checked ? c.add(item) : c.delete(item);
                    setSelectedInterface(c);
                    setCurrentPage(1);
                  }}
                />
                {item}
              </label>
            ))}
          </div>
        )}
      )}

      <div className="table-wrapper"><table className="table"><thead><tr>
        <th></th>
        <th onClick={() => handleSort('title')} className="sortable">Désignation {sortKey === 'title' && (ascending ? '▲' : '▼')}</th>
        <th onClick={() => handleSort('storage_type')} className="sortable">Stockage {sortKey === 'storage_type' && (ascending ? '▲' : '▼')}</th>
        <th onClick={() => handleSort('capacity_gb')} className="sortable">Capacité {sortKey === 'capacity_gb' && (ascending ? '▲' : '▼')}</th>
        <th onClick={() => handleSort('interface')} className="sortable">Interface {sortKey === 'interface' && (ascending ? '▲' : '▼')}</th>
        {selectedKind === 'HDD/SSD' && <th onClick={() => handleSort('form_factor_protocol')} className="sortable">Form Factor {sortKey === 'form_factor_protocol' && (ascending ? '▲' : '▼')}</th>}
        <th onClick={() => handleSort('brand')} className="sortable">Marque {sortKey === 'brand' && (ascending ? '▲' : '▼')}</th>
      </tr></thead><tbody>
        {pagedData.map((d, idx) => {
          const capacity = d.capacity_gb >= 1000 ? (d.capacity_gb / 1000).toFixed(1).replace(/\.0$/, '') + ' To' : d.capacity_gb + ' Go';
          const index = (currentPage - 1) * itemsPerPage + idx + 1;
          return (<tr key={d.asin}><td>{index}</td><td style={{ textAlign: 'left' }}><a href={d.url_affiliate} target="_blank" rel="nofollow sponsored">{d.title}</a></td><td>{d.storage_type}</td><td>{capacity}</td><td>{d.interface}</td>{selectedKind === 'HDD/SSD' && (<td>{d.form_factor_protocol}</td>)}<td>{d.brand}</td></tr>);
        })}
      </tbody></table></div>

      <div className="pagination">{Array.from({ length: totalPages }, (_, i) => i+1).map(p => (<button key={p} className={p===currentPage?'active':''} onClick={() => setCurrentPage(p)}>{p}</button>))}</div>
    </Fragment>
  );
}
