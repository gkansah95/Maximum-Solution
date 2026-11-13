import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  FileSpreadsheet,
  Landmark,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { ServiceItem } from '../config/company';

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
  linkTo?: string;
  linkLabel?: string;
}

const iconMap = {
  'shield-check': ShieldCheck,
  'file-spreadsheet': FileSpreadsheet,
  landmark: Landmark,
  users: Users,
  'bar-chart-3': BarChart3,
  briefcase: Briefcase,
};

export function ServiceCard({
  service,
  index = 0,
  linkTo = '/services',
  linkLabel = 'Learn More',
}: ServiceCardProps) {
  const Icon = iconMap[service.iconName] || ShieldCheck;
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-7 sm:p-8 transition-colors duration-200 hover:border-[#10243A]/30">
      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#F5F7FA] text-[#0F766E] border border-slate-200/80 transition-colors duration-200 group-hover:bg-[#10243A] group-hover:text-white group-hover:border-[#10243A]">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </div>
          <span className="text-xs font-medium tracking-wider text-slate-400 tabular-nums">
            {formattedIndex}
          </span>
        </div>

        <h3 className="text-xl font-bold tracking-tight text-[#10243A] mb-3">
          {service.title}
        </h3>

        <p className="text-[15px] leading-relaxed text-[#243244]/85">
          {service.shortDescription}
        </p>
      </div>

      <div className="mt-7 pt-5 border-t border-slate-100">
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F766E] transition-colors duration-150 hover:text-[#10243A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] rounded-sm whitespace-nowrap"
        >
          <span>{linkLabel}</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
