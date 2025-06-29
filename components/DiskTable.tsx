"use client";
import React, { useEffect, useMemo, useState, Fragment } from 'react';
import Head from 'next/head';
import manualProducts from '@/data/manualProducts.json';
import manualUSB from '@/data/manualUSB.json';
import manualCM from '@/data/manualCM.json';

type Disk = typeof manualProducts[number] | typeof manualUSB[number] | typeof manualCM[number];

export default function DiskTable() {
  const [selectedKind, setSelectedKind] = useState<'HDD/SSD' | 'Disque Flash' | 'Carte Mémoire'>('HDD/SSD');
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedStorage, setSelectedStorage] = useState<Set<string>>(new Set());
  const [minCap, setMinCap] = useState<number>(0);
  const [maxCap, setMaxCap] = useState<number>(Infinity);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [ascending, setAscending] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Select data source
  const dataByKind = useMemo<Disk[]>(() => {
    if (selectedKind === 'HDD/SSD') return manualProducts;
    if (selectedKind === 'Disque Flash') return manualUSB;
    return manualCM;
  }, [selectedKind]);

  // Extract brands and storage types
  const { brands, storageTypes } = useMemo(() => {
    const brandSet = new Set<string>();
    const storageSet = new Set<string>();
    dataByKind.forEach((d: any) => { brandSet.add(d.brand); storageSet.add(d.storage_type); });
    return {
      brands: Array.from(brandSet).sort(),
      storageTypes: Array.from(storageSet).sort()
    };
  }, [dataByKind]);

  // Apply filters and sorting
  const displayed = useMemo<Disk[]>(() => {
    let arr = dataByKind
      .filter((d: any) => selectedBrands.size ? selectedBrands.has(d.brand) : true)
      .filter((d: any) => selectedStorage.size ? selectedStorage.has(d.storage_type) : true)
      .filter((d: any) => {
        const tb = d.capacity_gb / 1000;
        return tb >= minCap && tb <= maxCap;
      });
    if (sortKey) {
      const mult = ascending ? 1 : -1;
      arr = arr.slice().sort((a: any, b: any) => {
        if (sortKey === 'capacity_gb') return mult * (a.capacity_gb - b.capacity_gb);
        return mult * String(a[sortKey]).localeCompare(b[sortKey], 'fr', { sensitivity: 'base' });
      });
    }
    return arr;
  }, [dataByKind, selectedBrands, selectedStorage, minCap, maxCap, sortKey, ascending]);

  // Pagination
  const totalPages = Math.ceil(displayed.length / itemsPerPage) || 1;
  const pagedData = displayed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleSort(key: string) {
    if (key === sortKey) setAscending(!ascending);
    else { setSortKey(key); setAscending(true); }
  }

  return (
    <Fragment>
      <Head><title>Meilleures ventes de disques durs et SSD 2025</title></Head>
      <div className="controls flex justify-between items-center mb-4">
        <div className="control-group flex items-center gap-2">
          <label className="font-semibold">Type de disques :</label>
          <select
            className="select"
            value={selectedKind}
            onChange={e => { setSelectedKind(e.target.value as any); setCurrentPage(1); }}
          >
            <option>HDD/SSD</option>
            <option>Clé USB</option>
            <option>Carte Mémoire</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="filter-btn ml-2"
          >
            {showFilters ? 'Fermer filtres' : 'Filtres'}
          </button>
        </div>
        <select
          className="select"
          value={itemsPerPage}
          onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
        >
          <option value={30}>30 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {showFilters && (
        <aside className="filter-panel mb-4">
          <div className="filter-box brands grid grid-cols-2 gap-2">
            <h3>Marque</h3>
            {brands.map(b => (
              <label key={b} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedBrands.has(b)}
                  onChange={e => {
                    const c = new Set(selectedBrands);
                    e.target.checked ? c.add(b) : c.delete(b);
                    setSelectedBrands(c);
                    setCurrentPage(1);
                  }}
                />
                {b}
              </label>
            ))}
          </div>
          <div className="filter-box">
            <h3>Type de stockage</h3>
            {storageTypes.map(t => (
              <label key={t} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedStorage.has(t)}
                  onChange={e => {
                    const c = new Set(selectedStorage);
                    e.target.checked ? c.add(t) : c.delete(t);
                    setSelectedStorage(c);
                    setCurrentPage(1);
                  }}
                />
                {t}
              </label>
            ))}
          </div>
          <div className="filter-box">
            <h3>Capacité (To)</h3>
            <div className="capacity-inputs flex gap-2">
              <input
                className="input"
                type="number"
                placeholder="Min"
                onChange={e => { setMinCap(+e.target.value || 0); setCurrentPage(1); }}
              />
              <input
                className="input"
                type="number"
                placeholder="Max"
                onChange={e => { setMaxCap(+e.target.value || Infinity); setCurrentPage(1); }}
              />
            </div>
          </div>
        </aside>
      )}

      <div className="table-wrapper overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSort('title')} className="sortable">Désignation{sortKey==='title'?(ascending?' ▲':' ▼'):''}</th>
              <th onClick={() => handleSort('storage_type')} className="sortable">Stockage{sortKey==='storage_type'?(ascending?' ▲':' ▼'):''}</th>
              <th onClick={() => handleSort('capacity_gb')} className="sortable">Capacité{sortKey==='capacity_gb'?(ascending?' ▲':' ▼'):''}</th>
              <th onClick={() => handleSort('interface')} className="sortable">Interface{sortKey==='interface'?(ascending?' ▲':' ▼'):''}</th>
              <th onClick={() => handleSort('form_factor_protocol')} className="sortable">{selectedKind==='HDD/SSD'? 'Form Factor' : 'Protocol'}{sortKey==='form_factor_protocol'?(ascending?' ▲':' ▼'):''}</th>
              <th onClick={() => handleSort('brand')} className="sortable">Marque{sortKey==='brand'?(ascending?' ▲':' ▼'):''}</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((d, idx) => {
              const index = (currentPage - 1) * itemsPerPage + idx + 1;
              const capText = (d as any).capacity_gb>=1000? ((d as any).capacity_gb/1000).toFixed(1).replace(/\.0$/,'')+' To': (d as any).capacity_gb+' Go';
              return (
                <tr key={(d as any).asin}>
                  <td>{index}</td>
                  <td className="text-left"><a href={(d as any).url_affiliate} target="_blank" rel="nofollow sponsored">{(d as any).title}</a></td>
                  <td>{(d as any).storage_type}</td>
                  <td>{capText}</td>
                  <td>{(d as any).interface}</td>
                  <td>{(d as any).form_factor_protocol}</td>
                  <td>{(d as any).brand}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination mt-4 flex justify-center gap-2">
        {Array.from({length: totalPages}, (_, i) => i+1).map(p => (
          <button key={p} className={p===currentPage?'active':''} onClick={()=>setCurrentPage(p)}>{p}</button>
        ))}
      </div>
    </Fragment>
  );
}
