export function ErrorState({ message="Something went wrong", onRetry }: { message?: string; onRetry?: ()=>void }) {
  return (
    <div className="text-center bg-surface2 rounded-lg border border-destructive/30 p-8">
      <p className="mb-3 text-destructive">{message}</p>
      {onRetry && <button className="rounded-md border px-3 py-1" onClick={onRetry}>Retry</button>}
    </div>
  );
}
