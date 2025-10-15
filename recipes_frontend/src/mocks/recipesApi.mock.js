import data from './fixtures/recipes.json';

function normalize(s) {
  return String(s || '').toLowerCase();
}

// PUBLIC_INTERFACE
const mock = {
  /** Mock implementation of recipes API with filtering and pagination. */

  // PUBLIC_INTERFACE
  async search(params = {}) {
    const {
      query = '',
      cuisine = '',
      diet = '',
      timeMin = '',
      timeMax = '',
      page = 1,
      pageSize = 12,
    } = params;

    const q = normalize(query);
    const cuis = normalize(cuisine);
    const d = normalize(diet);
    const tmin = Number(timeMin) || 0;
    const tmax = Number(timeMax) || Number.MAX_SAFE_INTEGER;

    let items = data;
    if (q) items = items.filter(r => normalize(r.title).includes(q));
    if (cuis) items = items.filter(r => normalize(r.cuisine) === cuis);
    if (d) items = items.filter(r => normalize(r.diet) === d);
    items = items.filter(r => Number(r.time) >= tmin && Number(r.time) <= tmax);

    const total = items.length;
    const start = (Math.max(1, page) - 1) * pageSize;
    const end = start + pageSize;
    const paged = items.slice(start, end);

    // Simulate latency
    await new Promise(res => setTimeout(res, 200));
    return { items: paged, total };
  },

  // PUBLIC_INTERFACE
  async getById(id) {
    const r = data.find(x => String(x.id) === String(id));
    // Simulate latency
    await new Promise(res => setTimeout(res, 150));
    if (!r) throw new Error('Not found');
    return r;
  }
};

export default mock;
