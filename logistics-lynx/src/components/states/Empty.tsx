export function Empty({ title="Nothing here yet", action }: { title?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center text-text-muted bg-surface2 rounded-lg border border-border p-8">
      <p className="mb-3">{title}</p>
      {action}
    </div>
  );
}
