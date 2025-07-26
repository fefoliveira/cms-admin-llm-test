import { useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams as _useSearchParams,
} from "react-router-dom";

// ----------------------------------------------------------------------

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return useMemo(
    () => ({
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      reload: () => window.location.reload(),
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
    }),
    [navigate, location]
  );
}

// ----------------------------------------------------------------------

export function useSearchParams() {
  const [searchParams, setSearchParams] = _useSearchParams();

  return useMemo(() => {
    const get = (key: string) => searchParams.get(key);
    const getAll = (key: string) => searchParams.getAll(key);
    const set = (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
    };
    const append = (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.append(key, value);
      setSearchParams(newSearchParams);
    };
    const delete_ = (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(key);
      setSearchParams(newSearchParams);
    };

    return {
      get,
      getAll,
      set,
      append,
      delete: delete_,
      toString: () => searchParams.toString(),
    };
  }, [searchParams, setSearchParams]);
}
