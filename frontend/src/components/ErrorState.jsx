export const ErrorState = ({ message, onRetry }) => (
  <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-red-100 bg-red-50/60 px-8 py-10 text-center text-red-700">
    <p className="text-sm font-medium">{message}</p>
    {onRetry ? (
      <button type="button" className="pill-button pill-button--primary bg-red-500 hover:bg-red-600" onClick={onRetry}>
        Try again
      </button>
    ) : null}
  </div>
);

