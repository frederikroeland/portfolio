/**
 * Site-wide constants. No personal contact details beyond LinkedIn (FR-011).
 * Canonical/OG URLs use SITE_URL; internal links are relative (path-agnostic).
 */
export const site = {
  name: 'Frederik Roeland',
  title: 'Global Product Director for Finance, Data & ESG',
  valueProposition:
    'Product leader turning finance, data and ESG regulation into products financial institutions can trust.',
  summary:
    'I lead product for Finance & ESG solutions, spanning subledger and accounting-hub capabilities, financial instrument & hedge accounting, financial consolidation, data-quality monitoring, ESG data management and sustainability reporting. I define the product vision, value proposition and go-to-market strategy, own the global roadmap, act as a subject-matter expert on IFRS, US GAAP and EU ESG regulation, and lead a 25-person team delivering measurable commercial results.',
  linkedinUrl: 'https://www.linkedin.com/in/frederik-r-38763a3/',
  cvPath: 'cv/frederik-roeland-cv-redacted.pdf',
  headshot: 'assets/frederik-roeland.jpg',
  ogImage: 'assets/frederik-roeland.jpg',
  siteUrl: 'https://frederikroeland.github.io/portfolio',
} as const;

export const currentRole = {
  role: 'Global Product Director for Finance, Data & ESG',
  organization: 'Regnology (formerly Wolters Kluwer Finance, Risk & Reporting)',
  period: '2018 – present',
  scope:
    'Product owner for Finance & ESG solutions: Subledger & Accounting Hub, Hedge Accounting, Financial Consolidation, Data-Quality Monitoring, IFRS 9, ESG data management and Sustainability Reporting.',
  outcomes: [
    '10% year-over-year revenue growth',
    '60% gross margin',
    'Customer NPS of 62',
    'Employee attrition below 5% over two years',
    'Leads a global team of 25',
  ],
} as const;

export interface CareerRole {
  role: string;
  organization: string;
  period: string;
  highlights: string[];
}

export const careerHistory: CareerRole[] = [
  {
    role: 'Solution Architect / Project Manager, EMEA',
    organization: 'Collibra',
    period: '2017 – 2018',
    highlights: [
      'Presales leadership converting prospects into new customers',
      'Solution and data-governance subject-matter expert for enterprise data implementations',
      'Established internal governance workflows and a prescriptive path for services delivery',
    ],
  },
  {
    role: 'Practice Lead / Project Manager / Senior Consultant, Finance, EMEA',
    organization: 'Wolters Kluwer Financial Services',
    period: '2009 – 2017',
    highlights: [
      'Led finance implementations across EMEA with a focus on IFRS 9 and accounting hubs',
      'Accountable for timely, high-quality delivery of finance projects',
      'Subject-matter expert in IFRS and US GAAP',
    ],
  },
  {
    role: 'Auditor / M&A / Tax',
    organization: 'Moore Stephens, Antwerp',
    period: '2006 – 2009',
    highlights: [
      'Forensic audits, business valuations and year-end audits',
      'Tax submissions and due-diligence documentation',
    ],
  },
];
