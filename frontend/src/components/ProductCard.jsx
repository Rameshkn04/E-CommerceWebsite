import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { formatCurrency } from '../utils/currency.js';

export const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const baseDescription = product.description ?? '';
  const truncatedDescription =
    baseDescription.length > 140 ? `${baseDescription.slice(0, 137).trimEnd()}…` : baseDescription;
  const summary = product.shortDescription ?? truncatedDescription;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-2xl">
      <Link to={`/products/${product._id}`} className="relative block aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl || product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.dataset.fallbackApplied) return;
            target.dataset.fallbackApplied = 'true';
            target.src =
              'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60';
          }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600 backdrop-blur">
          {product.brand}
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-5">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm text-slate-500">{summary}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-400">Price</span>
            <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.price)}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/products/${product._id}`}
              className="pill-button pill-button--secondary flex-1 justify-center border-slate-200"
            >
              View Details
            </Link>
            <button
              type="button"
              className="pill-button pill-button--primary flex-1 justify-center disabled:opacity-60"
              onClick={() => addToCart(product)}
              disabled={isInCart(product._id)}
            >
              {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

