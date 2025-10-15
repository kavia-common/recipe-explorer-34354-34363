import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function NotFound() {
  /** Fallback 404 page for unmatched routes. */
  return (
    <section className="card" style={{ padding: 24 }}>
      <h2>404 - Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link className="btn" to="/">Go Home</Link>
    </section>
  );
}
