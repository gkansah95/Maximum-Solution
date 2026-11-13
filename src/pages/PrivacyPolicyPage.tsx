import { Link } from 'react-router-dom';
import { ArrowLeft, Phone } from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { companyConfig } from '../config/company';

export function PrivacyPolicyPage() {
  return (
    <>
      <PageHead
        title={companyConfig.seo.pages.privacy.title}
        description={companyConfig.seo.pages.privacy.description}
      />

      <section className="bg-[#0B1929] text-white pt-36 pb-14 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B] mb-3">
            Legal &amp; Data Handling
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            {companyConfig.identity.name} · {companyConfig.contact.address.city},{' '}
            {companyConfig.identity.country}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="rounded-md border border-slate-200 bg-[#F5F7FA] p-5 text-sm text-[#243244]/85">
            {companyConfig.privacyPolicy.reviewNotice}
          </div>

          <div className="space-y-10 divide-y divide-slate-100">
            {companyConfig.privacyPolicy.sections.map((section, idx) => (
              <div key={section.id} className={idx === 0 ? '' : 'pt-8'}>
                <h2 className="text-xl font-bold text-[#10243A] mb-3">{section.title}</h2>
                <div className="space-y-3 text-[15px] leading-relaxed text-[#243244]/90">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="list-disc pl-5 space-y-1.5 pt-1">
                      {section.bulletPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] hover:text-[#0F766E] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Return to Home</span>
            </Link>

            <a
              href={companyConfig.contact.telephoneHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] hover:text-[#10243A] transition-colors tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Questions? Call {companyConfig.contact.telephoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
