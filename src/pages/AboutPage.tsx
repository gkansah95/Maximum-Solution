import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MapPin, Phone } from 'lucide-react';
import servicesAuditImg from '../assets/images/services_audit_review_1794558224143.jpg';
import { CorporateImage } from '../components/CorporateImage';
import { PageHead } from '../components/PageHead';
import { companyConfig } from '../config/company';

const proposedValues = [
  {
    title: 'Integrity',
    description:
      'Upholding honest, objective, and principled conduct in every client interaction and financial examination.',
  },
  {
    title: 'Professionalism',
    description:
      'Delivering courteous, punctual, and structured communication tailored to business owners and corporate teams.',
  },
  {
    title: 'Accountability',
    description:
      'Taking responsibility for thorough review work and helping organisations navigate their statutory audit obligations.',
  },
  {
    title: 'Transparency',
    description:
      'Communicating audit scopes, expectations, and observations clearly without unnecessary complexity.',
  },
  {
    title: 'Accuracy',
    description:
      'Focusing on meticulous verification of financial records, balances, and supporting schedules.',
  },
  {
    title: 'Confidentiality',
    description:
      'Safeguarding sensitive organisational and financial records shared during consultations and audit engagements.',
  },
];

export function AboutPage() {
  return (
    <>
      <PageHead
        title={companyConfig.seo.pages.about.title}
        description={companyConfig.seo.pages.about.description}
      />

      {/* Page Header */}
      <section className="bg-[#0B1929] text-white pt-36 pb-16 sm:pt-40 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
              About Us
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              A Dependable Statutory Auditing Practice in Accra, Ghana.
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              {companyConfig.identity.name} provides an accessible, professional point of contact
              for businesses and organisations seeking statutory auditing support.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-white py-20 sm:py-24 border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                Company Overview
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10243A]">
                Focused on Statutory Auditing &amp; Financial Confidence
              </h2>
              <p className="text-base leading-relaxed text-[#243244]/90">
                {companyConfig.identity.name} operates from {companyConfig.contact.address.street},{' '}
                {companyConfig.contact.address.subMetro}, in Accra, Ghana. Classified under{' '}
                {companyConfig.identity.category.toLowerCase()}, our focus is supporting businesses
                that require independent examination of their financial statements and clear
                guidance on statutory audit enquiries.
              </p>
              <p className="text-base leading-relaxed text-[#243244]/90">
                Whether you represent a growing small or medium-sized enterprise, a newly structured
                corporate entity, or an established organisation preparing for annual statutory
                reporting, we aim to provide a clear and responsive channel for discussing your
                requirements.
              </p>
            </div>

            <aside className="lg:col-span-5 rounded-lg border border-slate-200 bg-[#F5F7FA] p-7 space-y-5">
              <h3 className="text-lg font-bold text-[#10243A]">Practice Profile</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Registered Classification
                  </dt>
                  <dd className="mt-1 font-semibold text-[#10243A]">
                    {companyConfig.identity.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Location
                  </dt>
                  <dd className="mt-1 text-[#243244] flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                    <span>{companyConfig.contact.address.full}</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Office Telephone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={companyConfig.contact.telephoneHref}
                      className="inline-flex items-center gap-2 font-semibold text-[#0F766E] hover:text-[#10243A] tabular-nums"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      <span>{companyConfig.contact.telephoneDisplay}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Our Professional Values */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24 border-b border-slate-200/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
              Core Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#10243A]">
              Our Professional Values
            </h2>
            <p className="text-base leading-relaxed text-[#243244]/85">
              The standards below represent the core values that guide how {companyConfig.identity.shortName}{' '}
              communicates and conducts professional enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposedValues.map((value, index) => (
              <div
                key={value.title}
                className="rounded-lg border border-slate-200 bg-white p-7 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-[#C6A15B] tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-[#10243A]">{value.title}</h3>
                <p className="text-sm leading-relaxed text-[#243244]/85">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-lg border border-slate-200 overflow-hidden bg-[#F5F7FA]">
                <CorporateImage
                  src={servicesAuditImg}
                  alt="Structured audit working papers and financial records prepared for review"
                  containerClassName="aspect-[4/3] w-full"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0F766E]">
                Our Approach
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10243A]">
                Careful Financial Examination &amp; Clear Communication
              </h2>
              <p className="text-base leading-relaxed text-[#243244]/90">
                Sound financial governance depends on careful examination of underlying records,
                objective evaluation of financial statements, and open dialogue between auditors
                and management.
              </p>
              <p className="text-base leading-relaxed text-[#243244]/90">
                When prospective clients reach out to discuss a statutory audit, we prioritise
                understanding the organisation&apos;s structure, reporting timeline, and key
                documentation needs before outlining next steps clearly and transparently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#10243A] text-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Connect with Maximum Solutions.
            </h2>
            <p className="text-slate-300 text-base">
              Speak with our Accra office to discuss your organisation&apos;s statutory auditing
              requirements.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#C6A15B] px-6 py-3 text-sm font-semibold text-[#0B1929] transition-colors hover:bg-[#d4b26f] whitespace-nowrap shrink-0"
          >
            <span>Contact Us</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
