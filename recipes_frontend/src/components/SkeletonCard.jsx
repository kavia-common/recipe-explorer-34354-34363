import React from 'react';

// PUBLIC_INTERFACE
export default function SkeletonCard() {
  /** Skeleton placeholder card while loading data. */
  return (
    <div className="card" style={{ padding: 12 }}>
      <div className="skeleton" style={{ height: 150, borderRadius: 10 }} />
      <div style={{ padding: 8 }}>
        <div className="skeleton" style={{ height: 18, marginTop: 10, width: '60%' }} />
        <div className="skeleton" style={{ height: 14, marginTop: 8, width: '40%' }} />
        <div className="skeleton" style={{ height: 10, marginTop: 8, width: '80%' }} />
      </div>
    </div>
  );
}
