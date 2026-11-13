import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { companyConfig } from '../config/company';

export function NotFoundPage() {
  return (
    <>
      <PageHead
        title={`Page Not Found | ${companyConfig.identity.name}`}
        description="The requested page could not be found."
      />

      <section className="bg-[#F5F7FA] min-h-[70vh] flex items-center pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E] tabular-nums">
            Error 404
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#10243A]">
            Page Not Found
          </h1>
          <p className="text-base leading-relaxed text-[#243244]/85 max-w-lg mx-auto">
            The page you are looking for may have been moved or does not exist. Use the links below
            to return to the {companyConfig.identity.name} website.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#10243A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0B1929] transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#10243A] hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              <Phone className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
