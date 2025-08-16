import { useCallback, useEffect, useMemo, useRef } from "react";

// Always-latest value
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => { ref.current = value; }, [value]);
  return ref;
}

// Stable function reference that always sees the latest logic/state
export function useEvent<T extends (...args: unknown[]) => unknown>(fn: T) {
  const ref = useLatest(fn);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args: Parameters<T>) => ref.current(...args)) as T, []);
}

// Debounced invoker: const run = useDebounced(fn, 300); run(arg)
export function useDebounced<T extends (...args: unknown[]) => unknown>(fn: T, delay: number) {
  const ref = useLatest(fn);
  const t = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(((...args: Parameters<T>) => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => ref.current(...args), delay);
  }) as T, [delay]);
}

// Async effect with cancellation
export function useAsyncEffect(effect: (signal: AbortSignal) => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    const ac = new AbortController();
    effect(ac.signal).catch(() => {});
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// Stable interval that uses the latest callback
export function useInterval(callback: () => void, ms: number | null) {
  const cb = useEvent(callback);
  useEffect(() => {
    if (ms == null) return;
    const id = setInterval(cb, ms);
    return () => clearInterval(id);
  }, [cb, ms]);
}

// Derive objects/arrays once, keyed by inputs
export function useDerived<T>(factory: () => T, deps: unknown[]) {
  return useMemo(factory, deps);
}

// Stable callback that always sees latest logic/state without re-deps
export function useStableCallback<T extends (...args: unknown[]) => unknown>(fn: T) {
  const ref = useLatest(fn);
  return useCallback(((...args: Parameters<T>) => ref.current(...args)) as T, []);
}
