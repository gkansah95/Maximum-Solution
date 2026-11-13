import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top"
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 bg-white text-[#10243A] shadow-md transition-colors duration-150 hover:bg-[#10243A] hover:text-white hover:border-[#10243A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
