import { formatCurrency } from '../utils/currency.js';
import { QuantitySelector } from './QuantitySelector.jsx';

export const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleChange = (value) => {
    onQuantityChange(item.product._id, value);
  };

  return (
    <div className="glass-card flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100 sm:h-28 sm:w-28">
        <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 space-y-3">
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-semibold text-slate-900">{item.product.name}</h4>
          <p className="text-sm text-slate-500">{item.product.brand}</p>
        </div>
        <p className="text-sm font-medium text-slate-600">Unit price: {formatCurrency(item.product.price)}</p>
        <QuantitySelector value={item.quantity} onChange={handleChange} />
      </div>

      <div className="flex flex-col items-end gap-3">
        <p className="text-base font-semibold text-slate-900">
          {formatCurrency(item.product.price * item.quantity)}
        </p>
        <button
          type="button"
          className="text-sm font-medium text-slate-500 underline-offset-4 transition hover:text-red-500 hover:underline"
          onClick={() => onRemove(item.product._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
