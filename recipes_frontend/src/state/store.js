import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { recipesInitialState, recipesReducer, recipesActionsFactory } from './slices/recipesSlice';
import { uiInitialState, uiReducer, uiActionsFactory } from './slices/uiSlice';

const StoreContext = createContext(null);

function rootReducer(state, action) {
  return {
    recipes: recipesReducer(state.recipes, action),
    ui: uiReducer(state.ui, action),
  };
}

const initialState = {
  recipes: recipesInitialState,
  ui: uiInitialState,
};

// PUBLIC_INTERFACE
export function StoreProvider({ children }) {
  /** Provides global store context with recipes and UI slices. */
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const actions = useMemo(() => ({
    ...recipesActionsFactory(dispatch),
    ...uiActionsFactory(dispatch),
  }), [dispatch]);
  const value = useMemo(() => ({ state: { ...state, list: state.recipes.list }, actions }), [state, actions]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

// PUBLIC_INTERFACE
export function useStore() {
  /** Access the global store and actions. */
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useRecipes() {
  /** Access recipes slice state and actions. */
  const { state, actions } = useStore();
  return { state: state.recipes, actions };
}

// PUBLIC_INTERFACE
export function useUI() {
  /** Access UI slice state and actions. */
  const { state, actions } = useStore();
  return { state: state.ui ? { ui: state.ui } : { ui: initialState.ui }, actions };
}
