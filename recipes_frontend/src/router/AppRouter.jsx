import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';
import NotFound from '../pages/NotFound';
import SkeletonCard from '../components/SkeletonCard';

const RecipeDetails = lazy(() => import('../pages/RecipeDetails'));

// PUBLIC_INTERFACE
export function AppRouter() {
  /** Router for the application including all top-level routes. */
  return (
    <BrowserRouter>
      <Navbar />
      <main role="main" className="container" aria-live="polite">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recipe/:id"
            element={
              <Suspense fallback={<div className="grid cards" aria-busy="true" aria-label="Loading"><SkeletonCard /><SkeletonCard /><SkeletonCard /></div>}>
                <RecipeDetails />
              </Suspense>
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default AppRouter;
