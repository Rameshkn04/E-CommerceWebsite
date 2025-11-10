import { NavBar } from './NavBar.jsx';
import { Footer } from './Footer.jsx';

export const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-100">
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <NavBar />
      <main className="flex-1 py-10">{children}</main>
      <Footer />
    </div>
  </div>
);

