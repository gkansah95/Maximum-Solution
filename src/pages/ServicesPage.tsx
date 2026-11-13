import { Link } from 'react-router-dom';
import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';
import servicesAuditImg from '../assets/images/services_audit_review_1794558224143.jpg';
import { CorporateImage } from '../components/CorporateImage';
import { PageHead } from '../components/PageHead';
import { ServiceCard } from '../components/ServiceCard';
import { companyConfig, getPublishedServices } from '../config/company';

export function ServicesPage() {
  const publishedServices = getPublishedServices();
  const primaryService = publishedServices[0];

  return (
    <>
      <PageHead
        title={companyConfig.seo.pages.services.title}
        description={companyConfig.seo.pages.services.description}
      />

      {/* Header */}
      <section className="bg-[#0B1929] text-white pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
              Services
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Statutory Auditing Services for Ghanaian Organisations.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              Independent financial statement examination designed to support accountability,
              regulatory compliance, and stakeholder confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Confirmed Service Detail */}
      {primaryService && (
        <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                  <span>Confirmed Primary Practice Area</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243A]">
                  {primaryService.title}
                </h2>

                <p className="text-base leading-relaxed text-[#243244]/90">
                  {primaryService.fullDescription}
                </p>

                <p className="text-base leading-relaxed text-[#243244]/90">
                  For business owners, directors, and shareholders, an independent statutory audit
                  helps verify that financial statements reflect underlying accounting records
                  responsibly—strengthening credibility with lenders, partners, and regulatory
                  authorities.
                </p>

                {primaryService.keyFocusAreas.length > 0 && (
                  <div className="pt-4">
                    <h3 className="text-base font-bold text-[#10243A] mb-4">
                      Key Aspects of Statutory Audit Support
                    </h3>
                    <ul className="space-y-3">
                      {primaryService.keyFocusAreas.map((area) => (
                        <li key={area} className="flex items-start gap-3 text-[15px] text-[#243244]">
                          <Check
                            className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <Link
                    to={`/contact?service=${encodeURIComponent(primaryService.title)}`}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#10243A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B1929] whitespace-nowrap"
                  >
                    <span>Enquire About Statutory Auditing</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <a
                    href={companyConfig.contact.telephoneHref}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-[#10243A] transition-colors hover:bg-[#F5F7FA] tabular-nums whitespace-nowrap"
                  >
                    <Phone className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                    <span>{companyConfig.contact.telephoneDisplay}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-lg border border-slate-200 overflow-hidden bg-[#F5F7FA]">
                  <CorporateImage
                    src={servicesAuditImg}
                    alt="Statutory audit ledger documents and financial review instruments"
                    containerClassName="aspect-[4/3] w-full"
                  />
                </div>

                <div className="rounded-lg border border-slate-200 bg-[#F5F7FA] p-6 space-y-3">
                  <h3 className="text-base font-bold text-[#10243A]">
                    Preparing for an Audit Enquiry
                  </h3>
                  <p className="text-sm leading-relaxed text-[#243244]/85">
                    When contacting our office, it helps to share your organisation type, financial
                    year-end, and preferred timeframe so we can respond accurately during business
                    hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional published services (renders automatically if/when future services are confirmed & published in src/config/company.ts) */}
      {publishedServices.length > 1 && (
        <section className="bg-[#F5F7FA] py-20 sm:py-24 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#10243A] mb-10">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedServices.slice(1).map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  index={index + 1}
                  linkTo={`/contact?service=${encodeURIComponent(service.title)}`}
                  linkLabel="Enquire Now"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Direct Consultation Strip */}
      <section className="bg-[#F5F7FA] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-xl space-y-2">
              <h2 className="text-2xl font-bold text-[#10243A]">
                Need to Discuss Your Audit Requirements?
              </h2>
              <p className="text-sm sm:text-base text-[#243244]/85">
                Reach {companyConfig.identity.name} by telephone or submit a structured enquiry for
                our Accra office.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#10243A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0B1929] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
