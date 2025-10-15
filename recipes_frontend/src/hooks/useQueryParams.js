import { useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function useQueryParams() {
  /** Returns URLSearchParams instance for current location. */
  const { search } = useLocation();
  return new URLSearchParams(search);
}
