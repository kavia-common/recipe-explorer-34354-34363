import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import './theme/theme.css';
import './styles/util.css';
import { AppRouter } from './router/AppRouter';
import { StoreProvider, useUI } from './state/store';

// Internal component to sync theme to html attribute and localStorage
function ThemeSync() {
  const { state: { ui }, actions } = useUI();
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && saved !== ui.theme) {
      actions.setTheme(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', ui.theme);
    localStorage.setItem('theme', ui.theme);
  }, [ui.theme]);
  return null;
}

// PUBLIC_INTERFACE
function App() {
  return (
    <StoreProvider>
      <ThemeSync />
      <div className="app-shell">
        <AppRouter />
      </div>
    </StoreProvider>
  );
}

export default App;
