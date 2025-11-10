import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { CartItem } from '../components/CartItem.jsx';
import { formatCurrency } from '../utils/currency.js';

export const CartPage = () => {
  const { items, totalItems, totalPrice, updateCartItem, removeFromCart, resetCart } = useCart();

  const summary = useMemo(
    () => ({
      subtotal: totalPrice,
      shipping: totalPrice > 0 ? 9.99 : 0,
      tax: totalPrice * 0.07
    }),
    [totalPrice]
  );

  const grandTotal = summary.subtotal + summary.shipping + summary.tax;

  return (
    <section className="space-y-8">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Your cart</span>
        <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">Items curated for checkout</h1>
        <p className="text-sm text-slate-500">{totalItems} item(s) currently in your basket.</p>
      </header>

      {items.length === 0 ? (
        <div className="glass-card flex flex-col items-center gap-4 px-8 py-12 text-center text-slate-500">
          <p>Your cart is empty. Browse the catalogue to discover something you love.</p>
          <Link to="/" className="pill-button pill-button--primary">
            Explore products
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onQuantityChange={updateCartItem}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <aside className="glass-card h-fit space-y-5 px-6 py-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
              <p className="text-sm text-slate-500">Taxes calculated at checkout based on your location.</p>
            </div>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(summary.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{summary.shipping === 0 ? 'Free' : formatCurrency(summary.shipping)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Estimated tax</span>
                <span>{formatCurrency(summary.tax)}</span>
              </div>
              <hr className="border-slate-200" />
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            <button type="button" className="pill-button pill-button--primary w-full text-base">
              Proceed to Checkout
            </button>
            <button type="button" className="pill-button pill-button--secondary w-full text-base" onClick={resetCart}>
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </section>
  );
};
