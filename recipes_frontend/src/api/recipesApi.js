import { isMock, httpGet } from './client';
import mock from '../mocks/recipesApi.mock';

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
    return httpGet(`/api/recipes?${qs}`);
  },

  // PUBLIC_INTERFACE
  async getById(id) {
    /** Get a single recipe by ID. */
    if (isMock()) {
      return mock.getById(id);
    }
    return httpGet(`/api/recipes/${id}`);
  },
};

export default recipesApi;
