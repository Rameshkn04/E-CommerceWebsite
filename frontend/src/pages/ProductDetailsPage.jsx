import { useParams } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails.js';
import { useCart } from '../hooks/useCart.js';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx';
import { ErrorState } from '../components/ErrorState.jsx';
import { formatCurrency } from '../utils/currency.js';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error, refetch } = useProductDetails(productId);
  const { addToCart, isInCart } = useCart();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!product) {
    return <ErrorState message="Product not found." />;
  }

  const highlights = product.highlights ?? product.features ?? [];

  return (
    <section className="space-y-12 lg:space-y-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr] lg:gap-16">
        <div className="glass-card overflow-hidden p-6 sm:p-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 backdrop-blur">
              {product.brand}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {product.category ?? 'Lifestyle'}
            </div>
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">{product.name}</h1>
            <p className="text-lg leading-relaxed text-slate-600">{product.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white/80 px-6 py-5 shadow-inner">
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Price</span>
                <p className="mt-1 text-3xl font-semibold text-slate-900">{formatCurrency(product.price)}</p>
              </div>
              {'inventoryCount' in product ? (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Availability</span>
                  <p className="mt-1 text-sm font-medium text-brand-600">
                    {product.inventoryCount > 0 ? `${product.inventoryCount} in stock` : 'Out of stock'}
                  </p>
                </div>
              ) : null}
              {product.sku ? (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">SKU</span>
                  <p className="mt-1 text-sm font-medium text-slate-500">{product.sku}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="pill-button pill-button--primary flex-1 justify-center text-base disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-12"
              onClick={() => addToCart(product)}
              disabled={isInCart(product._id)}
            >
              {isInCart(product._id) ? 'Already in Cart' : 'Add to Cart'}
            </button>
            <button type="button" className="pill-button pill-button--secondary flex-1 justify-center sm:flex-none sm:px-12">
              Add to Wishlist
            </button>
          </div>

          {highlights.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900">Highlights</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {highlights.map((highlight, index) => (
                  <li
                    key={`${highlight}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 text-sm text-slate-500">
            <h3 className="text-base font-semibold text-slate-900">Shipping & Returns</h3>
            <p className="mt-2">
              Complimentary standard shipping on orders over $120. Free returns within 30 days. Expedited options
              available at checkout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
