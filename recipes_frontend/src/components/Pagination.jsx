import React from 'react';

// PUBLIC_INTERFACE
export default function Pagination({ page, total, pageSize, onPage }) {
  /** Pagination control with previous/next buttons and page info. */
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <div className="flex items-center justify-between" style={{ marginTop: 16 }}>
      <button className="btn secondary" onClick={() => onPage(page - 1)} disabled={prevDisabled} aria-disabled={prevDisabled} aria-label="Previous page">Prev</button>
      <span aria-live="polite">Page {page} of {totalPages}</span>
      <button className="btn secondary" onClick={() => onPage(page + 1)} disabled={nextDisabled} aria-disabled={nextDisabled} aria-label="Next page">Next</button>
    </div>
  );
}
