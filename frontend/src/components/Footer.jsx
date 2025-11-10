export const Footer = () => (
  <footer className="flex items-center justify-between border-t border-slate-200 py-8 text-sm text-slate-500">
    <p>© {new Date().getFullYear()} ShopSmart. Crafted with care.</p>
    <div className="flex items-center gap-6">
      <a href="#privacy" className="transition hover:text-slate-900">
        Privacy
      </a>
      <a href="#terms" className="transition hover:text-slate-900">
        Terms
      </a>
      <a href="#support" className="transition hover:text-slate-900">
        Support
      </a>
    </div>
  </footer>
);

