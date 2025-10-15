import recipesApi from '../../api/recipesApi';

export const recipesInitialState = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 12,
  total: 0,
  query: '',
  filters: {},
  favorites: {},        // id => true
  favoritesMap: {},     // id => recipe object
};

const types = {
  FETCH_START: 'recipes/fetchStart',
  FETCH_SUCCESS: 'recipes/fetchSuccess',
  FETCH_ERROR: 'recipes/fetchError',
  SET_QUERY: 'recipes/setQuery',
  SET_FILTERS: 'recipes/setFilters',
  SET_PAGE: 'recipes/setPage',
  TOGGLE_FAVORITE: 'recipes/toggleFavorite',
  HYDRATE_FAVORITES: 'recipes/hydrateFavorites',
};

export function recipesReducer(state = recipesInitialState, action) {
  switch (action.type) {
    case types.FETCH_START:
      return { ...state, loading: true, error: null };
    case types.FETCH_SUCCESS:
      return { ...state, loading: false, list: action.payload.items, total: action.payload.total };
    case types.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case types.SET_QUERY:
      return { ...state, query: action.payload };
    case types.SET_FILTERS:
      return { ...state, filters: action.payload || {} };
    case types.SET_PAGE:
      return { ...state, page: Math.max(1, action.payload) };
    case types.TOGGLE_FAVORITE: {
      const id = action.payload.id;
      const wasFav = !!state.favorites[id];
      const favorites = { ...state.favorites, [id]: !wasFav };
      const favoritesMap = { ...state.favoritesMap };
      if (!wasFav) favoritesMap[id] = action.payload;
      else delete favoritesMap[id];
      try {
        localStorage.setItem('favorites', JSON.stringify({ ids: favorites, items: favoritesMap }));
      } catch {}
      return { ...state, favorites, favoritesMap };
    }
    case types.HYDRATE_FAVORITES: {
      const { ids, items } = action.payload || {};
      return { ...state, favorites: ids || {}, favoritesMap: items || {} };
    }
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function recipesActionsFactory(dispatch) {
  /** Returns bound action creators for recipes slice. */
  return {
    // PUBLIC_INTERFACE
    fetchRecipes: async (getState) => {
      dispatch({ type: types.FETCH_START });
      try {
        // getState is optional; if provided, use it to pull current filters
        const s = typeof getState === 'function' ? getState() : null;
        const recipesState = s?.recipes || {};
        const params = {
          query: recipesState.query || '',
          cuisine: recipesState.filters?.cuisine || '',
          diet: recipesState.filters?.diet || '',
          timeMin: recipesState.filters?.timeMin || '',
          timeMax: recipesState.filters?.timeMax || '',
          page: recipesState.page || 1,
          pageSize: recipesState.pageSize || 12,
        };
        const res = await recipesApi.search(params);
        dispatch({ type: types.FETCH_SUCCESS, payload: res });
      } catch (e) {
        dispatch({ type: types.FETCH_ERROR, payload: e.message || 'Failed to load recipes' });
      }
    },
    // PUBLIC_INTERFACE
    setQuery: (q) => dispatch({ type: types.SET_QUERY, payload: q }),
    // PUBLIC_INTERFACE
    setFilters: (f) => dispatch({ type: types.SET_FILTERS, payload: f }),
    // PUBLIC_INTERFACE
    setPage: (p) => dispatch({ type: types.SET_PAGE, payload: p }),
    // PUBLIC_INTERFACE
    toggleFavorite: (recipe) => dispatch({ type: types.TOGGLE_FAVORITE, payload: recipe }),
    // PUBLIC_INTERFACE
    hydrateFavoritesFromLocalStorage: () => {
      try {
        const raw = localStorage.getItem('favorites');
        if (raw) {
          const parsed = JSON.parse(raw);
          dispatch({ type: types.HYDRATE_FAVORITES, payload: parsed });
        }
      } catch {}
    },
  };
}
