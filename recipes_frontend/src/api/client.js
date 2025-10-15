const USE_MOCKS = String(process.env.REACT_APP_USE_MOCKS || 'true').toLowerCase() === 'true';

// PUBLIC_INTERFACE
export function isMock() {
  /** Check whether the API is using mocks based on env flag. */
  return USE_MOCKS;
}

// PUBLIC_INTERFACE
export async function httpGet(url) {
  /** Basic GET wrapper for a real backend (not used when mocks enabled). */
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
