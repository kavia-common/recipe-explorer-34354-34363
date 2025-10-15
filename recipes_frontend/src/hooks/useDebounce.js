import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export default function useDebounce(value, delay = 300) {
  /** Debounces a value by the given delay. */
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}
