import { Link } from 'react-router-dom';
import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { companyConfig, getPublishedServices } from '../config/company';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const publishedServices = getPublishedServices();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1929] text-slate-300 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="light" showDescriptor />
            <p className="text-sm leading-relaxed text-slate-300/90 max-w-sm">
              {companyConfig.identity.name} is an Accra-based practice listed under{' '}
              {companyConfig.identity.category.toLowerCase()} in {companyConfig.identity.country},
              supporting organisations seeking clear, dependable financial audit engagements.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold tracking-wide text-white mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white mb-4">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm">
              {publishedServices.map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center text-sm font-medium text-[#C6A15B] hover:text-[#d8b878] transition-colors"
                >
                  Request a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Office &amp; Hours
            </h2>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#C6A15B] mt-0.5" aria-hidden="true" />
                <div>
                  <p className="leading-relaxed">{companyConfig.contact.address.full}</p>
                  <a
                    href={companyConfig.contact.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#C6A15B] hover:text-[#d8b878] transition-colors"
                  >
                    <span>Google Maps Directions</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#C6A15B]" aria-hidden="true" />
                <a
                  href={companyConfig.contact.telephoneHref}
                  className="font-medium text-white hover:text-[#C6A15B] transition-colors tabular-nums"
                >
                  {companyConfig.contact.telephoneDisplay}
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-[#C6A15B] mt-0.5" aria-hidden="true" />
                <div className="space-y-0.5 tabular-nums">
                  <p>{companyConfig.hours.weekdayShort}</p>
                  <p className="text-slate-400">{companyConfig.hours.weekendShort}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {companyConfig.identity.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Enquiries
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
