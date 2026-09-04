import type { Engagement } from './types.ts';

/**
 * Signature engagements (3–4). Client references stay generic; the privacy guard
 * fails the build on any denylisted client name (FR-018).
 * Each slug maps to a detail page at src/pages/work/<slug>.html.
 */
export const engagements: Engagement[] = [
  {
    title: 'Global IFRS 9 Programme Across 20+ Countries',
    slug: 'global-ifrs9-rollout',
    summary:
      'Shaped a multi-year, cross-border IFRS 9 implementation programme spanning more than twenty countries for a global finance group.',
    tags: ['IFRS 9', 'Banking', 'Programme Leadership', 'Regulatory'],
    clientDescriptor: 'a global finance group',
    role: 'Practice Lead & Programme Manager',
    impact: [
      'Coordinated delivery across 20+ countries with standardised implementation methods',
      'Established reusable quality and implementation standards adopted region-wide',
      'Aligned classification, impairment and FINREP requirements to a single delivery playbook',
    ],
    featuredOrder: 1,
  },
  {
    title: 'Award-Winning Climate-Risk Impact Analysis',
    slug: 'climate-risk-innovation',
    summary:
      'Drove the product innovation behind a climate-risk impact analysis capability, recognised with a global innovation award.',
    tags: ['ESG', 'Climate Risk', 'Product Innovation'],
    product: 'A solution to analyse the impact of physical and transition risk on credit risk',
    role: 'Global Product Director',
    impact: [
      'Shaped the vision and value proposition for climate-risk impact analysis',
      'Translated emerging ESG regulation into product capabilities',
      'Recognised with a global innovation award for climate-risk impact',
    ],
    featuredOrder: 2,
  },
  {
    title: 'Finance Transformation',
    slug: 'finance-transformation',
    summary:
      'Developed an application that enables finance transformation, automating accounting processes and improving operational efficiency.',
    tags: ['Finance Transformation', 'General Ledger', 'Accounting Automation', 'Banking'],
    clientDescriptor: 'a leading European bank',
    role: 'Subject Matter Expert',
    impact: [
      'Centralised and aligned data and accounting streams into a single source of truth',
      'Delivered high-quality, granular, daily accounting data with end-of-day balance updates',
      'Automated reconciliation for balance sheet, P&L and financial disclosures',
      'Reduced manual intervention and lowered the cost of compliance',
    ],
    featuredOrder: 3,
  },
];
