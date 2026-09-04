import { describe, expect, it } from 'vitest';
import { scanText } from '../../src/lib/privacy-guard.ts';

describe('privacy guard', () => {
  it('passes clean, anonymized content', () => {
    const text = '<p>Led an IFRS 9 programme for a global banking group. Connect on LinkedIn.</p>';
    expect(scanText('clean.html', text)).toEqual([]);
  });

  it('flags a denylisted client name', () => {
    const matches = scanText('leak.html', '<p>Delivered for ACME BANK across regions.</p>', {
      clients: ['ACME BANK'],
    });
    expect(matches.some((m) => m.kind === 'client' && m.match === 'ACME BANK')).toBe(true);
  });

  it('flags an email address', () => {
    const matches = scanText('leak.html', '<a href="mailto:someone@example.com">mail</a>');
    expect(matches.some((m) => m.kind === 'email')).toBe(true);
  });

  it('flags a phone number', () => {
    const matches = scanText('leak.html', '<p>Call +1 555 010 1234 today.</p>');
    expect(matches.some((m) => m.kind === 'phone' || m.kind === 'pii')).toBe(true);
  });

  it('does not flag a LinkedIn profile URL', () => {
    const text = '<a href="https://www.linkedin.com/in/frederik-r-38763a3/">LinkedIn</a>';
    expect(scanText('ok.html', text)).toEqual([]);
  });
});
