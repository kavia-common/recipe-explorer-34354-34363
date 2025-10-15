import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo-mark.svg';
import { useUI } from '../state/store';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** Top navigation bar with brand, links, and theme toggle. */
  const { state: { ui }, actions } = useUI();
  const toggleTheme = () => actions.setTheme(ui.theme === 'light' ? 'dark' : 'light');

  return (
    <header className="navbar">
      <div className="container flex items-center justify-between" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Link to="/" className="flex items-center gap-3" aria-label="Recipe Explorer Home">
          <img src={logo} alt="" width="28" height="28" />
          <span style={{ fontWeight: 700 }}>Recipe Explorer</span>
        </Link>
        <nav className="flex items-center gap-3" aria-label="Primary">
          <NavLink to="/" className="btn secondary" aria-label="Go to Home">Home</NavLink>
          <NavLink to="/favorites" className="btn secondary" aria-label="View Favorites">Favorites</NavLink>
          <button className="btn" onClick={toggleTheme} aria-label={`Switch to ${ui.theme === 'light' ? 'dark' : 'light'} theme`}>
            {ui.theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
      </div>
    </header>
  );
}
