import React from 'react';

// PUBLIC_INTERFACE
export default function Tag({ label }) {
  /** Simple pill tag. */
  return <span className="badge" aria-label={`Tag ${label}`}>{label}</span>;
}
