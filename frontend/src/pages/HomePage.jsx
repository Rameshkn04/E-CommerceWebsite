import { useProducts } from '../hooks/useProducts.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { LoadingIndicator } from '../components/LoadingIndicator.jsx';
import { ErrorState } from '../components/ErrorState.jsx';

export const HomePage = () => {
  const { data: products, isLoading, error, refetch } = useProducts();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  return (
    <section className="space-y-12">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-brand-500 px-8 py-16 text-white shadow-card sm:px-12">
        <div className="relative z-10 max-w-xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-100">
            New Season · Just In
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Elevate your everyday with design-led essentials.
          </h1>
          <p className="text-lg text-brand-100">
            Explore handpicked pieces built to last, made for comfort, and crafted with mindful detail.
          </p>
          <div className="flex flex-wrap gap-3 text-slate-900">
            <a href="#featured" className="pill-button pill-button--primary bg-white text-brand-700 hover:text-brand-900">
              Shop Featured
            </a>
            <a href="#story" className="pill-button pill-button--ghost text-white hover:bg-white/10">
              Our Story
            </a>
          </div>
        </div>
        <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
      </header>

      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured Picks</h2>
            <p className="text-sm text-slate-500">
              Thoughtfully curated products designed to complement your modern lifestyle.
            </p>
          </div>
          <button
            type="button"
            onClick={refetch}
            className="pill-button pill-button--ghost border border-white/40 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Refresh
          </button>
        </div>

        <div
          id="featured"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Product grid"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

