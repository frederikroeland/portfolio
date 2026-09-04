export interface Engagement {
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  clientDescriptor?: string;
  product?: string;
  role?: string;
  impact?: string[];
  externalUrl?: string;
  featuredOrder: number;
}

export interface Insight {
  title: string;
  summary?: string;
  topic?: string;
  externalUrl?: string;
  year?: number;
  order?: number;
}

export interface Recognition {
  title: string;
  awardingContext?: string;
  year: number;
  order?: number;
}

export interface ExpertiseGroup {
  category: string;
  items: string[];
  order?: number;
}
