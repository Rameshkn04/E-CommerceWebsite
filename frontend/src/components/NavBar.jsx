import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';

export const NavBar = () => {
  const { totalItems } = useCart();

  return (
    <header className="flex items-center justify-between py-8">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur transition hover:bg-white"
        >
          <span className="h-2 w-2 rounded-full bg-brand-500" />
          ShopSmart
        </Link>
        <span className="hidden text-sm text-slate-500 sm:inline-block">
          Curated essentials for your every day.
        </span>
      </div>

      <nav className="flex items-center gap-3 text-sm font-medium text-slate-500">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            clsx(
              'rounded-full px-4 py-2 transition hover:text-slate-900',
              isActive && 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
            )
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            clsx(
              'rounded-full px-4 py-2 transition hover:text-slate-900',
              isActive && 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
            )
          }
        >
          Cart
          <span className="ml-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand-500 px-2 text-xs font-semibold text-white">
            {totalItems}
          </span>
        </NavLink>
      </nav>
    </header>
  );
};

