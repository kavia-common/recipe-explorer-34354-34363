import React, { useEffect } from 'react';
import { useRecipes } from '../state/store';
import RecipeCard from '../components/RecipeCard';

// PUBLIC_INTERFACE
export default function Favorites() {
  /** Page showing recipes added to favorites. Persists across reloads. */
  const { state, actions } = useRecipes();

  useEffect(() => {
    actions.hydrateFavoritesFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const favList = Object.values(state.favoritesMap || {}).filter(Boolean);

  return (
    <section>
      <h2>Favorites</h2>
      {favList.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <div className="grid cards">
          {favList.map(r => <RecipeCard key={r.id} recipe={r} />)}
        </div>
      )}
    </section>
  );
}
