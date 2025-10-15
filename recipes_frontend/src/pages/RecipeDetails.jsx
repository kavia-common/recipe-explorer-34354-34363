import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipesApi from '../api/recipesApi';
import SkeletonCard from '../components/SkeletonCard';
import Rating from '../components/Rating';
import Tag from '../components/Tag';
import { useRecipes } from '../state/store';

// PUBLIC_INTERFACE
export default function RecipeDetails() {
  /** Detail page for a single recipe by ID, showing ingredients and steps. */
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { actions, state } = useRecipes();
  const isFav = state.favorites[id] === true;

  useEffect(() => {
    let active = true;
    setLoading(true);
    recipesApi.getById(id).then((data) => {
      if (active) {
        setRecipe(data);
        setLoading(false);
      }
    }).catch(() => setLoading(false));
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <section>
        <div className="grid cards">
          <SkeletonCard />
        </div>
      </section>
    );
  }

  if (!recipe) {
    return <p>Recipe not found.</p>;
  }

  return (
    <article className="card" style={{ padding: 16 }}>
      <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
        <img src={recipe.image} alt="" style={{ width: 320, maxWidth: '100%', borderRadius: 12 }} />
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2>{recipe.title}</h2>
          <div className="flex items-center gap-3">
            <Rating value={recipe.rating || 4} />
            <span className="badge">{recipe.time} min</span>
            {recipe.cuisine && <Tag label={recipe.cuisine} />}
            {recipe.diet && <Tag label={recipe.diet} />}
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => actions.toggleFavorite(recipe)} aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}>
              {isFav ? '♥︎ Remove Favorite' : '♡ Add Favorite'}
            </button>
          </div>
          <p style={{ color: 'var(--muted)', marginTop: 12 }}>{recipe.description}</p>
        </div>
      </div>
      <hr style={{ margin: '16px 0', borderColor: 'rgba(0,0,0,0.06)' }} />
      <section>
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}
        </ul>
      </section>
      <section style={{ marginTop: 12 }}>
        <h3>Steps</h3>
        <ol>
          {recipe.steps?.map((s, idx) => <li key={idx} style={{ marginBottom: 6 }}>{s}</li>)}
        </ol>
      </section>
    </article>
  );
}
