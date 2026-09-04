import type { ExpertiseGroup } from './types.ts';

export const expertise: ExpertiseGroup[] = [
  {
    category: 'Regulatory & Accounting Standards',
    order: 1,
    items: [
      'IFRS 9',
      'US GAAP',
      'Subledger & ledger accounting',
      'Financial consolidation',
      'FINREP / COREP regulatory reporting',
    ],
  },
  {
    category: 'ESG & Sustainability',
    order: 2,
    items: [
      'ESG data management',
      'Sustainability reporting',
      'Climate-risk management',
      'Climate-risk disclosures',
    ],
  },
  {
    category: 'Data & Governance',
    order: 3,
    items: [
      'Data quality monitoring',
      'Data governance',
      'Data modelling design',
      'ETL & data aggregation',
    ],
  },
  {
    category: 'Product & Commercial Leadership',
    order: 4,
    items: [
      'Product vision & strategy',
      'Go-to-market & positioning',
      'Global roadmap ownership',
      'Presales & sales enablement',
      'Drive P&L, revenue growth & EBITDA',
    ],
  },
  {
    category: 'Certifications',
    order: 5,
    items: ['PRINCE2', 'FRM (Financial Risk Management)', 'Start2Coach Certification'],
  },
  {
    category: 'Education',
    order: 6,
    items: [
      'MSc Financial & Actuarial Engineering',
      'MSc Financial Management',
      'MSc Business Economics',
    ],
  },
  {
    category: 'Languages',
    order: 7,
    items: [
      'Dutch (native)',
      'English (fluent)',
      'French (professional)',
      'Spanish (basic)',
      'Ukrainian (basic)',
      'German (basic)',
    ],
  },
  {
    category: 'Technology',
    order: 8,
    items: [
      'SQL',
      'Cursor',
      'Python',
      'JavaScript',
      'React',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'Power BI',
    ],
  },
];
