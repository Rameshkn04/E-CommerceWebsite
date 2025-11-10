export const LoadingIndicator = () => (
  <div className="flex flex-col items-center gap-4 py-16">
    <span className="inline-flex h-12 w-12 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-500" />
    <p className="text-sm font-medium text-slate-500">Loading…</p>
  </div>
);

