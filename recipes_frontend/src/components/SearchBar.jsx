import React, { useState, useEffect } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ initialQuery = '', initialFilters = {}, onChange }) {
  /** Search bar with text query and basic filters. Calls onChange with {query, filters}. */
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    cuisine: initialFilters.cuisine || '',
    diet: initialFilters.diet || '',
    timeMin: initialFilters.timeMin || '',
    timeMax: initialFilters.timeMax || '',
  });

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setFilters({
      cuisine: initialFilters.cuisine || '',
      diet: initialFilters.diet || '',
      timeMin: initialFilters.timeMin || '',
      timeMax: initialFilters.timeMax || '',
    });
  }, [initialFilters]);

  const handleChange = () => {
    onChange && onChange({ query, filters });
  };

  useEffect(() => {
    const t = setTimeout(() => handleChange(), 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filters]);

  return (
    <section aria-label="Search recipes" className="card" style={{ padding: 16, marginBottom: 16 }}>
      <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
        <label style={{ flex: 1 }}>
          <span className="visually-hidden">Search by title</span>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes by title..."
            aria-label="Search recipes by title"
          />
        </label>
        <label>
          <span className="visually-hidden">Cuisine</span>
          <select
            className="input"
            value={filters.cuisine}
            onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
            aria-label="Filter by cuisine"
          >
            <option value="">Cuisine</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Indian</option>
            <option>American</option>
            <option>Thai</option>
            <option>Japanese</option>
            <option>Mediterranean</option>
          </select>
        </label>
        <label>
          <span className="visually-hidden">Diet</span>
          <select
            className="input"
            value={filters.diet}
            onChange={(e) => setFilters({ ...filters, diet: e.target.value })}
            aria-label="Filter by diet"
          >
            <option value="">Diet</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Gluten-Free</option>
            <option>Keto</option>
            <option>Pescatarian</option>
          </select>
        </label>
        <label>
          <span className="visually-hidden">Min time</span>
          <input
            className="input"
            type="number"
            min="0"
            placeholder="Min (min)"
            value={filters.timeMin}
            onChange={(e) => setFilters({ ...filters, timeMin: e.target.value })}
            aria-label="Minimum cooking time in minutes"
            style={{ width: 120 }}
          />
        </label>
        <label>
          <span className="visually-hidden">Max time</span>
          <input
            className="input"
            type="number"
            min="0"
            placeholder="Max (min)"
            value={filters.timeMax}
            onChange={(e) => setFilters({ ...filters, timeMax: e.target.value })}
            aria-label="Maximum cooking time in minutes"
            style={{ width: 120 }}
          />
        </label>
      </div>
    </section>
  );
}
