import { useCallback, useEffect, useMemo, useRef } from "react";

export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => { ref.current = value; }, [value]);
  return ref;
}

// Stable callback that always sees latest logic/state without re-deps
export function useEvent<T extends (...args: unknown[]) => unknown>(fn: T) {
  const ref = useLatest(fn);
  return useCallback(((...args: Parameters<T>) => ref.current(...args)) as T, []);
}

// Debounced effect usage: const run = useDebouncedCallback(fn, 300); run(arg)
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  const ref = useLatest(fn);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(((...args: Parameters<T>) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => ref.current(...args), delay);
  }) as T, [delay]);
}

export function useAsyncEffect(effect: (signal: AbortSignal) => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    const ac = new AbortController();
    effect(ac.signal).catch(() => {/* swallow */});
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Shallow-stable object (prevents effect churn when values unchanged)
export function useShallowStable<T extends Record<string, unknown>>(obj: T): T {
  const ref = useRef(obj);
  const stable = useMemo(() => {
    const old = ref.current;
    const same =
      Object.keys(old).length === Object.keys(obj).length &&
      Object.keys(obj).every(k => old[k] === obj[k]);
    if (!same) ref.current = obj;
    return ref.current;
  }, [obj]);
  return stable;
}
