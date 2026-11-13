import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import heroOfficeImg from '../assets/images/hero_audit_office_1794558224072.jpg';
import servicesAuditImg from '../assets/images/services_audit_review_1794558224143.jpg';
import { CorporateImage } from '../components/CorporateImage';
import { PageHead } from '../components/PageHead';
import { ServiceCard } from '../components/ServiceCard';
import { companyConfig, getPublishedServices } from '../config/company';

const homeHighlights = [
  {
    title: 'Professional Integrity',
    description:
      'Independent financial examination grounded in ethical standards and objective judgement.',
  },
  {
    title: 'Transparency',
    description:
      'Clear, structured audit communication that helps directors and stakeholders understand key findings.',
  },
  {
    title: 'Accuracy',
    description:
      'Careful verification of financial records, schedules, and supporting documentation.',
  },
  {
    title: 'Accountability',
    description:
      'Supporting businesses in meeting their statutory reporting obligations across Ghana.',
  },
  {
    title: 'Responsible Financial Reporting',
    description:
      'Encouraging disciplined financial governance and well-ordered accounting records.',
  },
  {
    title: 'Professional Communication',
    description:
      'Responsive, courteous engagement from initial enquiry through to audit completion.',
  },
];

export function HomePage() {
  const publishedServices = getPublishedServices();

  return (
    <>
      <PageHead
        title={companyConfig.seo.pages.home.title}
        description={companyConfig.seo.pages.home.description}
      />

      {/* B. Hero Section */}
      <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center bg-[#0B1929] text-white overflow-hidden pt-20">
        <div className="absolute inset-0">
          <CorporateImage
            src={heroOfficeImg}
            alt="Executive corporate boardroom in Accra prepared for financial audit review"
            loading="eager"
            containerClassName="h-full w-full"
            className="h-full w-full object-cover object-center opacity-55"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0B1929]/95 via-[#0B1929]/82 to-[#0B1929]/45"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wider uppercase text-[#C6A15B] mb-5">
              <span>{companyConfig.identity.name}</span>
              <span aria-hidden="true">·</span>
              <span>{companyConfig.identity.category}</span>
              <span aria-hidden="true">·</span>
              <span>Accra, {companyConfig.identity.country}</span>
            </div>

            <h1 className="text-[clamp(2.15rem,4vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-white mb-6">
              Building Financial Confidence Through Professional Audit Services.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-200 max-w-xl mb-9">
              Professional statutory auditing and financial assurance enquiries for businesses seeking
              clarity, accountability, and confidence in their financial affairs.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#C6A15B] px-6 py-3 text-sm font-semibold text-[#0B1929] transition-colors duration-150 hover:bg-[#d4b26f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A15B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1929] whitespace-nowrap"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                to="/contact#office-details"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 hover:border-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-[#C6A15B]" aria-hidden="true" />
                <span>Contact Our Office</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* C. Company Introduction */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                About the Practice
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243A] leading-tight">
                Professionalism. Integrity. Financial Confidence.
              </h2>
              <p className="text-base leading-relaxed text-[#243244]/85">
                {companyConfig.identity.name} is an Accra-based business listed under statutory
                auditors in Ghana, serving small and medium-sized enterprises, corporate
                organisations, and business owners seeking dependable statutory audit support.
              </p>
              <p className="text-base leading-relaxed text-[#243244]/85">
                From our office on Palace St in the Okaikoi South Sub-Metro, we focus on clear
                communication, disciplined financial examination, and practical responsiveness so
                organisations can approach their statutory responsibilities with confidence.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#10243A] hover:text-[#0F766E] transition-colors whitespace-nowrap"
                >
                  <span>Read About Our Practice</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg border border-slate-200 overflow-hidden bg-[#F5F7FA]">
                <CorporateImage
                  src={servicesAuditImg}
                  alt="Structured financial audit papers, ledger schedules, and inspection tools on an executive desk"
                  containerClassName="aspect-[4/3] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Services Overview */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24 border-b border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                Core Practice Area
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243A]">
                Focused Statutory Auditing Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] hover:text-[#0F766E] transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Service Details</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          {publishedServices.length === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 flex">
                <ServiceCard
                  service={publishedServices[0]}
                  index={0}
                  linkTo="/services"
                  linkLabel="Learn More About Statutory Auditing"
                />
              </div>

              <aside className="lg:col-span-5 flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 sm:p-8">
                <div>
                  <div className="flex items-center gap-2.5 text-[#0F766E] mb-4">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Who We Assist
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#10243A] mb-3">
                    Built for Ghanaian Businesses &amp; Corporate Entities
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#243244]/85 mb-5">
                    We welcome statutory audit enquiries from small and medium-sized enterprises,
                    growing companies, and established corporate organisations across Accra and
                    Ghana.
                  </p>
                  <ul className="space-y-2.5 text-sm text-[#243244]/90 border-t border-slate-100 pt-5">
                    <li>Independent financial statement examination</li>
                    <li>Structured documentation and schedule review</li>
                    <li>Direct telephone and in-office consultation in Accra</li>
                  </ul>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-100">
                  <Link
                    to="/contact?service=Statutory+Auditing"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] hover:text-[#0F766E] transition-colors"
                  >
                    <span>Enquire About Statutory Auditing</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </aside>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* E. Why Choose Us */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
              Guiding Standards
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243A]">
              Principles That Guide Our Work
            </h2>
            <p className="text-base leading-relaxed text-[#243244]/85">
              Every financial enquiry and audit engagement requires careful attention, clear
              communication, and professional discipline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 border-t border-slate-200 pt-10">
            {homeHighlights.map((item, idx) => (
              <div key={item.title} className="space-y-2.5">
                <span className="block text-xs font-semibold tracking-wider text-[#C6A15B] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}.
                </span>
                <h3 className="text-lg font-bold text-[#10243A]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#243244]/85">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Consultation CTA */}
      <section className="bg-[#10243A] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Let&apos;s Discuss Your Business Needs.
              </h2>
              <p className="text-base leading-relaxed text-slate-200">
                Looking for professional statutory auditing assistance? Get in touch with{' '}
                {companyConfig.identity.name} to discuss your requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <Link
                to="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#C6A15B] px-6 py-3 text-sm font-semibold text-[#0B1929] transition-colors duration-150 hover:bg-[#d4b26f] whitespace-nowrap"
              >
                <span>Contact Us Today</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={companyConfig.contact.telephoneHref}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-white/10 tabular-nums whitespace-nowrap"
              >
                <Phone className="h-4 w-4 text-[#C6A15B]" aria-hidden="true" />
                <span>{companyConfig.contact.telephoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* G. Location and Business Information */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                  Accra Office
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10243A]">
                  Location &amp; Business Hours
                </h2>
                <p className="text-sm leading-relaxed text-[#243244]/85">
                  Visit our office or telephone during standard business hours to arrange an
                  initial discussion.
                </p>
              </div>

              <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Physical Address
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#10243A] leading-relaxed">
                      {companyConfig.contact.address.full}
                    </p>
                    <a
                      href={companyConfig.contact.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F766E] hover:text-[#10243A] transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-start gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Telephone
                    </p>
                    <a
                      href={companyConfig.contact.telephoneHref}
                      className="mt-1 inline-block text-base font-bold text-[#10243A] hover:text-[#0F766E] transition-colors tabular-nums"
                    >
                      {companyConfig.contact.telephoneDisplay}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-2.5 mb-5">
                  <Clock className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
                  <h3 className="text-lg font-bold text-[#10243A]">Operating Hours</h3>
                </div>

                <dl className="divide-y divide-slate-100">
                  {companyConfig.hours.schedule.map((row) => (
                    <div
                      key={row.day}
                      className="flex items-center justify-between py-3 text-sm"
                    >
                      <dt className="font-medium text-[#10243A]">{row.day}</dt>
                      <dd
                        className={`tabular-nums ${
                          row.isClosed ? 'text-slate-400 font-medium' : 'text-[#243244] font-medium'
                        }`}
                      >
                        {row.hours}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
