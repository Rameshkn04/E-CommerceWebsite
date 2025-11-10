export const QuantitySelector = ({ value, onChange, min = 1, max = 10 }) => {
  const decrement = () => {
    const next = Math.max(min, value - 1);
    onChange(next);
  };

  const increment = () => {
    const next = Math.min(max, value + 1);
    onChange(next);
  };

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-2 shadow-sm shadow-slate-200/50">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="h-9 w-9 rounded-full text-lg font-semibold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold text-slate-800">{value}</span>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="h-9 w-9 rounded-full text-lg font-semibold text-slate-500 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
};

