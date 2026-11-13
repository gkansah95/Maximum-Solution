import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { PageHead } from '../components/PageHead';
import { companyConfig, getPublishedServices } from '../config/company';

interface FormState {
  fullName: string;
  organisation: string;
  email: string;
  telephone: string;
  subject: string;
  serviceOfInterest: string;
  message: string;
  website: string; // Honeypot
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const publishedServices = getPublishedServices();
  const defaultService =
    searchParams.get('service') &&
    publishedServices.some((s) => s.title === searchParams.get('service'))
      ? (searchParams.get('service') as string)
      : publishedServices[0]?.title || 'Statutory Auditing';

  const [form, setForm] = useState<FormState>({
    fullName: '',
    organisation: '',
    email: '',
    telephone: '',
    subject: '',
    serviceOfInterest: defaultService,
    message: '',
    website: '',
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error' | 'unavailable';
    message: string;
  } | null>(null);
  const [serviceStatus, setServiceStatus] = useState<'checking' | 'configured' | 'unconfigured'>(
    'checking'
  );

  useEffect(() => {
    let active = true;
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        setServiceStatus(data?.configured ? 'configured' : 'unconfigured');
      })
      .catch(() => {
        if (!active) return;
        setServiceStatus('unconfigured');
      });
    return () => {
      active = false;
    };
  }, []);

  function validateClient(state: FormState): FieldErrors {
    const errors: FieldErrors = {};

    if (state.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(state.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    const digits = state.telephone.replaceAll(/[^\d]/g, '');
    if (digits.length < 7) {
      errors.telephone = 'Please enter a valid telephone number.';
    }
    if (state.subject.trim().length < 3) {
      errors.subject = 'Please provide a brief subject for your enquiry.';
    }
    if (!state.serviceOfInterest.trim()) {
      errors.serviceOfInterest = 'Please select a service of interest.';
    }
    if (state.message.trim().length < 15) {
      errors.message = 'Please enter a message of at least 15 characters.';
    }

    return errors;
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (submitResult?.type === 'error') {
      setSubmitResult(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitResult(null);

    const clientErrors = validateClient(form);
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setSubmitResult({
        type: 'error',
        message: 'Please correct the highlighted fields before submitting.',
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.ok === true) {
        setSubmitResult({
          type: 'success',
          message:
            data.message ||
            'Thank you. Your enquiry has been sent to Maximum Solution (Chartered Accounts).',
        });
        setForm({
          fullName: '',
          organisation: '',
          email: '',
          telephone: '',
          subject: '',
          serviceOfInterest: defaultService,
          message: '',
          website: '',
        });
        setFieldErrors({});
        return;
      }

      if (data?.fieldErrors && typeof data.fieldErrors === 'object') {
        setFieldErrors(data.fieldErrors as FieldErrors);
      }

      if (response.status === 503 || data?.unconfigured) {
        setServiceStatus('unconfigured');
        setSubmitResult({
          type: 'unavailable',
          message:
            data?.error ||
            `The online enquiry service is temporarily unavailable. Please telephone our office directly on ${companyConfig.contact.telephoneDisplay}.`,
        });
        return;
      }

      setSubmitResult({
        type: 'error',
        message:
          data?.error ||
          `We could not send your enquiry. Please call ${companyConfig.contact.telephoneDisplay} directly.`,
      });
    } catch {
      setSubmitResult({
        type: 'error',
        message: `A connection error prevented sending your enquiry. Please call ${companyConfig.contact.telephoneDisplay} directly.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHead
        title={companyConfig.seo.pages.contact.title}
        description={companyConfig.seo.pages.contact.description}
      />

      {/* Page Header */}
      <section className="bg-[#0B1929] text-white pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Speak With Maximum Solution (Chartered Accounts).
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-300 max-w-2xl">
              Submit a statutory auditing enquiry or contact our Accra office directly by telephone
              during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Content */}
      <section id="office-details" className="bg-[#F5F7FA] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-lg border border-slate-200 bg-white p-7 sm:p-8 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                    Office Details
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#10243A]">
                    {companyConfig.identity.name}
                  </h2>
                </div>

                {/* Telephone */}
                <div className="border-t border-slate-100 pt-5 flex items-start gap-3.5">
                  <Phone className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Telephone
                    </p>
                    <a
                      href={companyConfig.contact.telephoneHref}
                      className="mt-1 inline-block text-lg font-bold text-[#10243A] hover:text-[#0F766E] transition-colors tabular-nums"
                    >
                      {companyConfig.contact.telephoneDisplay}
                    </a>
                    <p className="mt-1 text-xs text-slate-500">
                      Tap or click to call during office hours.
                    </p>
                  </div>
                </div>

                {/* Physical Location */}
                <div className="border-t border-slate-100 pt-5 flex items-start gap-3.5">
                  <MapPin className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-[#243244] font-medium">
                      {companyConfig.contact.address.full}
                    </p>
                    <a
                      href={companyConfig.contact.mapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[40px] items-center gap-2 rounded-md border border-slate-300 bg-[#F5F7FA] px-4 py-2 text-xs font-semibold text-[#10243A] hover:bg-[#10243A] hover:text-white hover:border-[#10243A] transition-colors"
                    >
                      <span>Get Google Maps Directions</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="border-t border-slate-100 pt-5 flex items-start gap-3.5">
                  <Clock className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5" aria-hidden="true" />
                  <div className="w-full">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                      Working Hours
                    </p>
                    <dl className="divide-y divide-slate-100 text-sm">
                      {companyConfig.hours.schedule.map((row) => (
                        <div key={row.day} className="flex items-center justify-between py-1.5">
                          <dt className="text-[#243244] font-medium">{row.day}</dt>
                          <dd
                            className={`tabular-nums ${
                              row.isClosed ? 'text-slate-400' : 'text-[#10243A] font-medium'
                            }`}
                          >
                            {row.hours}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                {/* Optional WhatsApp Integration (Hidden until confirmed enabled by owner) */}
                {companyConfig.contact.whatsapp.enabled && (
                  <div className="border-t border-slate-100 pt-5">
                    <a
                      href={`https://wa.me/${companyConfig.contact.whatsapp.number.replaceAll(/[^\d]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-[#0F766E] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0d655e] transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" aria-hidden="true" />
                      <span>{companyConfig.contact.whatsapp.label}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-lg border border-slate-200 bg-white p-7 sm:p-10">
                <div className="space-y-2 mb-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                    Online Enquiry
                  </p>
                  <h2 className="text-2xl font-bold text-[#10243A]">
                    Request a Consultation
                  </h2>
                  <p className="text-sm leading-relaxed text-[#243244]/80">
                    Complete the form below to send an enquiry regarding statutory auditing.
                    Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {/* Unconfigured Banner when backend email credentials are not yet set */}
                {serviceStatus === 'unconfigured' && (
                  <div
                    role="status"
                    className="mb-7 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className="h-5 w-5 shrink-0 text-amber-700 mt-0.5"
                        aria-hidden="true"
                      />
                      <div className="space-y-1.5">
                        <p className="font-semibold">
                          Online enquiry service temporarily unavailable
                        </p>
                        <p className="leading-relaxed text-amber-900">
                          Electronic email delivery for this form has not yet been activated. Please
                          telephone our office directly on{' '}
                          <a
                            href={companyConfig.contact.telephoneHref}
                            className="font-bold underline hover:text-[#10243A] tabular-nums"
                          >
                            {companyConfig.contact.telephoneDisplay}
                          </a>{' '}
                          ({companyConfig.hours.weekdayShort}).
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submission Result Feedback */}
                {submitResult && (
                  <div
                    role={submitResult.type === 'success' ? 'status' : 'alert'}
                    className={`mb-7 rounded-md border p-4 text-sm ${
                      submitResult.type === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                        : 'border-red-200 bg-red-50 text-red-950'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submitResult.type === 'success' ? (
                        <CheckCircle2
                          className="h-5 w-5 shrink-0 text-[#0F766E] mt-0.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertCircle
                          className="h-5 w-5 shrink-0 text-red-700 mt-0.5"
                          aria-hidden="true"
                        />
                      )}
                      <div className="space-y-1">
                        <p className="font-semibold">
                          {submitResult.type === 'success'
                            ? 'Enquiry Sent Successfully'
                            : submitResult.type === 'unavailable'
                              ? 'Online Service Unavailable'
                              : 'Unable to Submit Enquiry'}
                        </p>
                        <p className="leading-relaxed">{submitResult.message}</p>
                        {submitResult.type !== 'success' && (
                          <p className="pt-1">
                            Direct Telephone:{' '}
                            <a
                              href={companyConfig.contact.telephoneHref}
                              className="font-bold underline tabular-nums"
                            >
                              {companyConfig.contact.telephoneDisplay}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot spam protection field — hidden from human visitors */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => handleChange('website', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Full Name <span className="text-red-700">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.fullName)}
                        aria-describedby={fieldErrors.fullName ? 'fullName-error' : undefined}
                        placeholder="e.g. Kwame Mensah"
                        className={`w-full min-h-[44px] rounded-md border px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          fieldErrors.fullName
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#10243A] focus:ring-[#10243A]/15'
                        }`}
                      />
                      {fieldErrors.fullName && (
                        <p id="fullName-error" className="mt-1.5 text-xs font-medium text-red-700">
                          {fieldErrors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="organisation"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Company / Organisation
                      </label>
                      <input
                        id="organisation"
                        name="organisation"
                        type="text"
                        autoComplete="organization"
                        value={form.organisation}
                        onChange={(e) => handleChange('organisation', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.organisation)}
                        placeholder="e.g. Accra Trading Ltd"
                        className="w-full min-h-[44px] rounded-md border border-slate-300 px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:border-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#10243A]/15"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Email Address <span className="text-red-700">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                        placeholder="name@company.com"
                        className={`w-full min-h-[44px] rounded-md border px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          fieldErrors.email
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#10243A] focus:ring-[#10243A]/15'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="email-error" className="mt-1.5 text-xs font-medium text-red-700">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="telephone"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Telephone Number <span className="text-red-700">*</span>
                      </label>
                      <input
                        id="telephone"
                        name="telephone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={form.telephone}
                        onChange={(e) => handleChange('telephone', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.telephone)}
                        aria-describedby={fieldErrors.telephone ? 'telephone-error' : undefined}
                        placeholder="+233 XX XXX XXXX"
                        className={`w-full min-h-[44px] rounded-md border px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          fieldErrors.telephone
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#10243A] focus:ring-[#10243A]/15'
                        }`}
                      />
                      {fieldErrors.telephone && (
                        <p id="telephone-error" className="mt-1.5 text-xs font-medium text-red-700">
                          {fieldErrors.telephone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="serviceOfInterest"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Service of Interest <span className="text-red-700">*</span>
                      </label>
                      <select
                        id="serviceOfInterest"
                        name="serviceOfInterest"
                        required
                        value={form.serviceOfInterest}
                        onChange={(e) => handleChange('serviceOfInterest', e.target.value)}
                        className="w-full min-h-[44px] rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#243244] focus:border-[#10243A] focus:outline-none focus:ring-2 focus:ring-[#10243A]/15"
                      >
                        {publishedServices.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-[#10243A] mb-1.5"
                      >
                        Subject <span className="text-red-700">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        aria-invalid={Boolean(fieldErrors.subject)}
                        aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                        placeholder="e.g. Annual Statutory Audit Enquiry"
                        className={`w-full min-h-[44px] rounded-md border px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                          fieldErrors.subject
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-300 focus:border-[#10243A] focus:ring-[#10243A]/15'
                        }`}
                      />
                      {fieldErrors.subject && (
                        <p id="subject-error" className="mt-1.5 text-xs font-medium text-red-700">
                          {fieldErrors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-[#10243A] mb-1.5"
                    >
                      Message <span className="text-red-700">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      placeholder="Please outline your organisation's enquiry, reporting period, or preferred time for a telephone consultation."
                      className={`w-full rounded-md border px-3.5 py-2.5 text-sm text-[#243244] placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        fieldErrors.message
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-slate-300 focus:border-[#10243A] focus:ring-[#10243A]/15'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="message-error" className="mt-1.5 text-xs font-medium text-red-700">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      By submitting, you acknowledge our{' '}
                      <Link
                        to="/privacy-policy"
                        className="font-medium text-[#0F766E] underline hover:text-[#10243A]"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-[#10243A] px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#0B1929] disabled:cursor-not-allowed disabled:opacity-65 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10243A] focus-visible:ring-offset-2 whitespace-nowrap"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Sending Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Submit Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
