import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Tag from './Tag';
import { useRecipes } from '../state/store';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Card displaying recipe summary information with favorite toggle. */
  const { actions, state } = useRecipes();
  const isFav = state.favorites[recipe.id] === true;

  const toggleFav = (e) => {
    e.preventDefault();
    actions.toggleFavorite(recipe);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="card" style={{ padding: 12 }}>
      <article aria-label={`Recipe ${recipe.title}`}>
        <div style={{ position: 'relative' }}>
          <img src={recipe.image} alt="" style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 10 }} />
          <button
            className="btn"
            onClick={toggleFav}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
            style={{ position: 'absolute', top: 8, right: 8, padding: '6px 10px' }}
          >
            {isFav ? '♥︎' : '♡'}
          </button>
        </div>
        <div style={{ padding: 8 }}>
          <h3 style={{ margin: '8px 0' }}>{recipe.title}</h3>
          <div className="flex items-center gap-3" style={{ marginBottom: 8 }}>
            <Rating value={recipe.rating || 4} />
            <span className="badge">{recipe.time} min</span>
          </div>
          <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
            {recipe.cuisine && <Tag label={recipe.cuisine} />}
            {recipe.diet && <Tag label={recipe.diet} />}
          </div>
        </div>
      </article>
    </Link>
  );
}
