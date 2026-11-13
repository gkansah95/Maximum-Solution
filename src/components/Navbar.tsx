import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isTransparentHero = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        isTransparentHero
          ? 'bg-[#0B1929]/70 backdrop-blur-md border-b border-white/10'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs'
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-[72px] max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark (single line, clean lockup) */}
        <BrandLogo variant={isTransparentHero ? 'light' : 'dark'} />

        {/* Zone 2: Primary navigation links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-sm ${
                  isTransparentHero
                    ? isActive
                      ? 'text-white'
                      : 'text-slate-200 hover:text-white'
                    : isActive
                      ? 'text-[#10243A] font-semibold'
                      : 'text-slate-600 hover:text-[#10243A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 transition-opacity duration-150 ${
                      isTransparentHero ? 'bg-[#C6A15B]' : 'bg-[#0F766E]'
                    } ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/contact"
            className={`hidden md:inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isTransparentHero
                ? 'bg-[#C6A15B] text-[#0B1929] hover:bg-[#d3b06d] focus-visible:ring-[#C6A15B]'
                : 'bg-[#10243A] text-white hover:bg-[#0B1929] focus-visible:ring-[#10243A]'
            }`}
          >
            Request a Consultation
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className={`inline-flex md:hidden h-11 w-11 items-center justify-center rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] ${
              isTransparentHero
                ? 'text-white hover:bg-white/10'
                : 'text-[#10243A] hover:bg-slate-100'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-lg"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center rounded-md px-3 text-[15px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F5F7FA] text-[#10243A] font-semibold'
                      : 'text-[#243244] hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <Link
              to="/contact"
              className="flex min-h-[44px] w-full items-center justify-center rounded-md bg-[#10243A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0B1929] transition-colors"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
