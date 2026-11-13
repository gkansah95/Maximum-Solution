export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyFocusAreas: string[];
  iconName: 'shield-check' | 'file-spreadsheet' | 'landmark' | 'users' | 'bar-chart-3' | 'briefcase';
  /**
   * Only services explicitly confirmed by the company owner should have published: true.
   * Unconfirmed services remain hidden from the public website until approved.
   */
  published: boolean;
}

export interface BusinessHourRow {
  day: string;
  hours: string;
  isClosed: boolean;
}

export interface PrivacySection {
  id: string;
  title: string;
  paragraphs: string[];
  bulletPoints?: string[];
}

export const companyConfig = {
  identity: {
    name: 'Maximum Solutions Chartered Accountants',
    shortName: 'Maximum Solutions',
    descriptor: 'Chartered Accountants',
    monogram: 'MS',
    category: 'Statutory Auditors',
    country: 'Ghana',
    /**
     * Optional official logo image URL. Leave null to render the reusable MS text-based emblem.
     */
    logoUrl: null as string | null,
  },

  contact: {
    telephoneDisplay: '+233 20 384 9792',
    telephoneHref: 'tel:+233203849792',
    address: {
      street: 'Palace St',
      subMetro: 'Okaikoi South Sub-Metro',
      region: 'Greater Accra Region',
      city: 'Accra',
      country: 'Ghana',
      full: 'Palace St, Okaikoi South Sub-Metro, Greater Accra Region, Accra, Ghana',
    },
    mapsDirectionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Palace+St%2C+Okaikoi+South+Sub-Metro%2C+Greater+Accra+Region%2C+Accra%2C+Ghana',
    /**
     * Online enquiry destination email is configured via server-side environment variables
     * (RESEND_API_KEY, CONTACT_TO_EMAIL, EMAIL_FROM). Do not place unverified email addresses here.
     */
    publicEmailConfigured: false,
    publicEmailDisplay: null as string | null,
    /**
     * WhatsApp remains disabled until the company owner confirms that +233 20 384 9792 is WhatsApp-enabled.
     */
    whatsapp: {
      enabled: false,
      number: '+233203849792',
      label: 'Message on WhatsApp',
    },
  },

  hours: {
    summary: 'Monday–Friday: 8:00 AM – 5:00 PM · Saturday–Sunday: Closed',
    weekdayShort: 'Monday–Friday: 8 AM–5 PM',
    weekendShort: 'Saturday–Sunday: Closed',
    schedule: [
      { day: 'Monday', hours: '8:00 AM – 5:00 PM', isClosed: false },
      { day: 'Tuesday', hours: '8:00 AM – 5:00 PM', isClosed: false },
      { day: 'Wednesday', hours: '8:00 AM – 5:00 PM', isClosed: false },
      { day: 'Thursday', hours: '8:00 AM – 5:00 PM', isClosed: false },
      { day: 'Friday', hours: '8:00 AM – 5:00 PM', isClosed: false },
      { day: 'Saturday', hours: 'Closed', isClosed: true },
      { day: 'Sunday', hours: 'Closed', isClosed: true },
    ] as BusinessHourRow[],
  },

  brandColors: {
    primaryNavy: '#10243A',
    deepNavy: '#0B1929',
    emeraldTeal: '#0F766E',
    mutedGold: '#C6A15B',
    white: '#FFFFFF',
    lightBackground: '#F5F7FA',
    darkText: '#243244',
  },

  services: [
    {
      id: 'statutory-auditing',
      title: 'Statutory Auditing',
      shortDescription:
        'Independent examination of financial statements prepared for statutory reporting requirements, supporting transparency, accountability, and confidence among stakeholders.',
      fullDescription:
        'A statutory audit is an independent examination of an organisation’s financial statements and underlying financial records conducted to assess whether the financial statements present a true and fair view in accordance with applicable financial reporting frameworks and statutory requirements in Ghana.',
      keyFocusAreas: [
        'Independent review of annual financial statements and supporting ledger records',
        'Evaluation of internal financial documentation and record-keeping consistency',
        'Objective audit reporting designed to reinforce stakeholder and board confidence',
        'Clear, structured communication with management throughout the audit cycle',
      ],
      iconName: 'shield-check',
      published: true,
    },
    // Future configurable service placeholders — remain hidden until confirmed by the company owner.
    {
      id: 'accounting-and-bookkeeping',
      title: 'Accounting and Bookkeeping',
      shortDescription:
        'Structured recording of day-to-day financial transactions, reconciliations, and ledger maintenance.',
      fullDescription:
        'Configurable placeholder service pending confirmation by Maximum Solutions Chartered Accountants.',
      keyFocusAreas: [],
      iconName: 'file-spreadsheet',
      published: false,
    },
    {
      id: 'tax-advisory',
      title: 'Tax Advisory',
      shortDescription:
        'Guidance on statutory tax obligations, filing schedules, and regulatory compliance.',
      fullDescription:
        'Configurable placeholder service pending confirmation by Maximum Solutions Chartered Accountants.',
      keyFocusAreas: [],
      iconName: 'landmark',
      published: false,
    },
    {
      id: 'payroll-services',
      title: 'Payroll Services',
      shortDescription:
        'Accurate payroll computation, statutory deductions administration, and schedule preparation.',
      fullDescription:
        'Configurable placeholder service pending confirmation by Maximum Solutions Chartered Accountants.',
      keyFocusAreas: [],
      iconName: 'users',
      published: false,
    },
    {
      id: 'financial-reporting',
      title: 'Financial Reporting',
      shortDescription:
        'Preparation and presentation of structured periodic financial statements for management and stakeholders.',
      fullDescription:
        'Configurable placeholder service pending confirmation by Maximum Solutions Chartered Accountants.',
      keyFocusAreas: [],
      iconName: 'bar-chart-3',
      published: false,
    },
    {
      id: 'business-advisory',
      title: 'Business Advisory',
      shortDescription:
        'Practical commercial and financial governance perspectives for growing enterprises.',
      fullDescription:
        'Configurable placeholder service pending confirmation by Maximum Solutions Chartered Accountants.',
      keyFocusAreas: [],
      iconName: 'briefcase',
      published: false,
    },
  ] as ServiceItem[],

  values: [
    {
      title: 'Professional Integrity',
      description:
        'Approaching every financial review with objectivity, ethical discipline, and independent judgement.',
    },
    {
      title: 'Transparency',
      description:
        'Providing clear, unambiguous observations so business owners and directors understand their financial position.',
    },
    {
      title: 'Accuracy',
      description:
        'Applying disciplined attention to detail when examining ledgers, schedules, and supporting documentation.',
    },
    {
      title: 'Accountability',
      description:
        'Supporting organisations in fulfilling their statutory financial reporting obligations with consistency.',
    },
    {
      title: 'Responsible Financial Reporting',
      description:
        'Promoting structured financial record-keeping that stands up to stakeholder and regulatory scrutiny.',
    },
    {
      title: 'Confidentiality',
      description:
        'Treating client enquiries and financial documentation with strict discretion and professional care.',
    },
  ],

  seo: {
    defaultTitle: 'Maximum Solutions Chartered Accountants – Statutory Auditors in Accra, Ghana',
    defaultDescription:
      'Maximum Solutions Chartered Accountants is an Accra-based firm listed under statutory auditors in Ghana. Contact our Palace St office for audit enquiries.',
    keywords: [
      'Statutory Auditors in Accra',
      'Chartered Accountants in Accra',
      'Auditing Services in Ghana',
      'Financial Audit Services in Accra',
    ],
    pages: {
      home: {
        title: 'Maximum Solutions Chartered Accountants – Statutory Auditors in Accra, Ghana',
        description:
          'Professional statutory auditing and financial assurance enquiries in Accra, Ghana. Visit Palace St, Okaikoi South Sub-Metro or call +233 20 384 9792.',
      },
      about: {
        title: 'About Us | Maximum Solutions Chartered Accountants – Accra, Ghana',
        description:
          'Learn about Maximum Solutions Chartered Accountants, an Accra-based statutory auditing business committed to integrity, transparency, and financial confidence.',
      },
      services: {
        title: 'Services | Maximum Solutions Chartered Accountants – Statutory Auditors',
        description:
          'Explore statutory auditing services at Maximum Solutions Chartered Accountants in Accra, Ghana. Independent examination of financial statements for organisations.',
      },
      contact: {
        title: 'Contact Us | Maximum Solutions Chartered Accountants – Accra, Ghana',
        description:
          'Contact Maximum Solutions Chartered Accountants on Palace St, Okaikoi South Sub-Metro, Accra or call +233 20 384 9792 Monday to Friday, 8:00 AM to 5:00 PM.',
      },
      privacy: {
        title: 'Privacy Policy | Maximum Solutions Chartered Accountants',
        description:
          'Read how Maximum Solutions Chartered Accountants collects, uses, and handles enquiry information submitted through this website.',
      },
    },
  },

  privacyPolicy: {
    reviewNotice:
      'Drafted for corporate website publication and structured for periodic review by Maximum Solutions Chartered Accountants.',
    sections: [
      {
        id: 'overview',
        title: '1. Purpose of This Privacy Policy',
        paragraphs: [
          'Maximum Solutions Chartered Accountants, located at Palace St, Okaikoi South Sub-Metro, Greater Accra Region, Accra, Ghana, respects the privacy of visitors who browse this website or submit business enquiries.',
          'This Privacy Policy explains what information is collected through our website enquiry form, why it is collected, how it is handled, and how you may contact our office regarding your personal information.',
        ],
      },
      {
        id: 'information-collected',
        title: '2. Information We Collect',
        paragraphs: [
          'We aim to collect only the information reasonably necessary to respond to your enquiry. When you submit the Contact Us form on this website, we collect the details you provide:',
        ],
        bulletPoints: [
          'Full Name',
          'Company or Organisation name (where provided)',
          'Email Address',
          'Telephone Number',
          'Subject and Service of Interest',
          'Enquiry Message content',
        ],
      },
      {
        id: 'how-we-use-information',
        title: '3. Why We Collect This Information',
        paragraphs: [
          'Enquiry information submitted through this website is used solely to review your request, communicate with you regarding statutory auditing or related business enquiries, and arrange an initial consultation where appropriate.',
          'We do not sell, rent, or distribute enquiry contact details to third parties for unrelated marketing purposes.',
        ],
      },
      {
        id: 'handling-and-retention',
        title: '4. How Enquiry Information Is Handled',
        paragraphs: [
          'Submitted enquiries are transmitted via a configured server-side email delivery provider directly to the designated office mailbox of Maximum Solutions Chartered Accountants. We apply input validation and automated spam-prevention checks before processing submissions.',
          'Enquiry correspondence is retained only for as long as reasonably required to address your request or maintain ordinary business communication records.',
        ],
      },
      {
        id: 'contact-and-requests',
        title: '5. Accessing, Correcting, or Deleting Your Information',
        paragraphs: [
          'If you have submitted an enquiry and would like to update, correct, or request removal of the personal contact details you shared with us, please contact our office directly during business hours (Monday to Friday, 8:00 AM – 5:00 PM) on +233 20 384 9792, or visit our office at Palace St, Okaikoi South Sub-Metro, Accra, Ghana.',
        ],
      },
    ] as PrivacySection[],
  },
};

export function getPublishedServices(): ServiceItem[] {
  return companyConfig.services.filter((service) => service.published);
}
