'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function TypeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('type') || 'HDD/SSD';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('type', newType);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
      <label htmlFor="type-selector" style={{ fontWeight: 600, color: 'var(--primary-400)' }}>
        Type de disques :
      </label>
      <select
        id="type-selector"
        className="select"
        value={current}
        onChange={handleChange}
      >
        <option value="HDD/SSD">HDD/SSD</option>
        <option value="Disque Flash">Clé USB</option>
        <option value="Carte Mémoire">Carte Mémoire</option>
      </select>
    </div>
  );
}
