import React from 'react';

// PUBLIC_INTERFACE
export default function Modal({ title, open, onClose, children }) {
  /** Basic modal dialog. */
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={title}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
        display: 'grid', placeItems: 'center', zIndex: 50
      }}>
      <div className="card" style={{ width: 'min(92vw, 640px)', padding: 16 }}>
        <div className="flex items-center justify-between">
          <h3>{title}</h3>
          <button className="btn secondary" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div style={{ marginTop: 12 }}>{children}</div>
      </div>
    </div>
  );
}
