import React from 'react';

// PUBLIC_INTERFACE
export default function Rating({ value = 0, outOf = 5 }) {
  /** Read-only star rating display. */
  const stars = [];
  for (let i = 1; i <= outOf; i++) {
    stars.push(i <= value ? '★' : '☆');
  }
  return <span aria-label={`Rating ${value} out of ${outOf}`} style={{ color: 'goldenrod' }}>{stars.join(' ')}</span>;
}
