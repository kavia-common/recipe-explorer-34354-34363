import { isMock, httpGet } from './client';
import mock from '../mocks/recipesApi.mock';

// Compute API base URL once from env (fallback to empty -> relative URLs)
const API_BASE = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/g, '');

// Helper to join base and path cleanly
function withBase(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return API_BASE ? `${API_BASE}${p}` : p;
}

// PUBLIC_INTERFACE
const recipesApi = {
  /** Recipes API abstraction with mock/real switch. */

  // PUBLIC_INTERFACE
  async search(params = {}) {
    /** Search recipes with filters and pagination.
     params: { query, cuisine, diet, timeMin, timeMax, page, pageSize } */
    if (isMock()) {
      return mock.search(params);
    }
    const qs = new URLSearchParams(params).toString();
    return httpGet(withBase(`/api/recipes?${qs}`));
  },

  // PUBLIC_INTERFACE
  async getById(id) {
    /** Get a single recipe by ID. */
    if (isMock()) {
      return mock.getById(id);
    }
    return httpGet(withBase(`/api/recipes/${id}`));
  },
};

export default recipesApi;
