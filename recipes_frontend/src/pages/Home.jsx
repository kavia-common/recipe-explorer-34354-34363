import React, { useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import SkeletonCard from '../components/SkeletonCard';
import Pagination from '../components/Pagination';
import { useRecipes } from '../state/store';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page showing search bar and recipe grid. */
  const { state, actions } = useRecipes();
  const { list, loading, error, page, pageSize, total, query, filters } = state;

  useEffect(() => {
    actions.fetchRecipes(() => ({ recipes: state }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query, filters]);

  const handleSearchChange = ({ query: q, filters: f }) => {
    actions.setQuery(q || '');
    actions.setFilters(f || {});
    actions.setPage(1);
  };

  return (
    <section>
      <div className="bg-gradient-amber" style={{ borderRadius: 16, padding: 16, margin: '16px 0' }}>
        <h1 style={{ margin: 0 }}>Discover elegant recipes</h1>
        <p style={{ marginTop: 6, color: 'var(--muted)' }}>Browse, search, and save your favorites.</p>
      </div>

      <SearchBar initialQuery={query} initialFilters={filters} onChange={handleSearchChange} />

      {error && <div role="alert" style={{ color: 'var(--error)', marginBottom: 12 }}>{error}</div>}

      {loading ? (
        <div className="grid cards" aria-busy="true" aria-label="Loading recipes">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <>
          <div className="grid cards">
            {list.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
          <Pagination
            page={page}
            total={total}
            pageSize={pageSize}
            onPage={(p) => actions.setPage(p)}
          />
        </>
      )}
    </section>
  );
}
