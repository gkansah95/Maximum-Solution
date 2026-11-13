import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface CorporateImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  fallbackTitle?: string;
}

export function CorporateImage({
  src,
  alt,
  className = 'h-full w-full object-cover',
  containerClassName = '',
  loading = 'lazy',
  fallbackTitle = 'Maximum Solutions Chartered Accountants',
}: CorporateImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B1929] via-[#10243A] to-[#163452] p-8 text-center text-white ${containerClassName}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <Building2 className="relative h-10 w-10 text-[#C6A15B] mb-3" strokeWidth={1.5} />
        <p className="relative text-sm font-medium text-slate-200 max-w-xs">{fallbackTitle}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
