import { Link } from 'react-router-dom';
import { companyConfig } from '../config/company';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  showDescriptor?: boolean;
  className?: string;
}

export function BrandLogo({
  variant = 'dark',
  showDescriptor = false,
  className = '',
}: BrandLogoProps) {
  const { name, shortName, descriptor, monogram, logoUrl } = companyConfig.identity;

  const textColor = variant === 'light' ? 'text-white' : 'text-[#10243A]';
  const subTextColor = variant === 'light' ? 'text-slate-300' : 'text-slate-500';
  const emblemBg =
    variant === 'light'
      ? 'bg-white/10 border-white/25 text-white'
      : 'bg-[#10243A] border-[#10243A] text-white';

  return (
    <Link
      to="/"
      aria-label={`${name} – Home`}
      className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 rounded-sm ${className}`}
    >
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="h-9 w-auto object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded border text-xs font-bold tracking-wider transition-colors duration-200 ${emblemBg}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {monogram}
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`text-[15px] sm:text-base font-bold tracking-tight ${textColor}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {shortName}
        </span>
        {showDescriptor && (
          <span className={`mt-1 text-[11px] font-medium tracking-wide ${subTextColor}`}>
            {descriptor}
          </span>
        )}
      </span>
    </Link>
  );
}
