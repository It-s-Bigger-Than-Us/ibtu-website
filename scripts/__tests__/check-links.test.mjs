/**
 * check-links.test.mjs
 * Vitest tests for findBrokenLinks() - written BEFORE implementation (TDD).
 *
 * A "broken link" is any internal href that points to:
 *   - a route with status "Retired"
 *   - a path not present in the route list at all
 *
 * A link to a "Live" or "Redirect" route is NOT flagged.
 */

import { describe, it, expect } from 'vitest';
import { findBrokenLinks } from '../check-links.mjs';

const SAMPLE_ROUTES = [
  { path: '/', status: 'Live' },
  { path: '/about', status: 'Live' },
  { path: '/our-programs', status: 'Live' },
  { path: '/events', status: 'Live' },
  { path: '/partners', status: 'Redirect' },
  { path: '/services', status: 'Retired' },
];

describe('findBrokenLinks', () => {
  it('flags a link to a Retired route', () => {
    const links = [{ file: 'app/page.tsx', href: '/services' }];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      file: 'app/page.tsx',
      href: '/services',
      reason: 'retired',
    });
  });

  it('flags a link to an unknown route (not in list at all)', () => {
    const links = [{ file: 'components/sections/CTASection.tsx', href: '/does-not-exist' }];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      file: 'components/sections/CTASection.tsx',
      href: '/does-not-exist',
      reason: 'unknown',
    });
  });

  it('does NOT flag a link to a Live route', () => {
    const links = [{ file: 'app/page.tsx', href: '/about' }];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(0);
  });

  it('does NOT flag a link to a Redirect route', () => {
    const links = [{ file: 'components/layout/Footer.tsx', href: '/partners' }];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(0);
  });

  it('does NOT flag the root "/" path', () => {
    const links = [{ file: 'components/layout/TopNav.tsx', href: '/' }];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(0);
  });

  it('handles an empty links array', () => {
    const result = findBrokenLinks([], SAMPLE_ROUTES);
    expect(result).toHaveLength(0);
  });

  it('handles an empty routes array - all links are unknown', () => {
    const links = [{ file: 'app/page.tsx', href: '/about' }];
    const result = findBrokenLinks(links, []);
    expect(result).toHaveLength(1);
    expect(result[0].reason).toBe('unknown');
  });

  it('handles multiple mixed links correctly', () => {
    const links = [
      { file: 'a.tsx', href: '/about' },       // Live - OK
      { file: 'b.tsx', href: '/services' },     // Retired - flagged
      { file: 'c.tsx', href: '/nowhere' },      // Unknown - flagged
      { file: 'd.tsx', href: '/partners' },     // Redirect - OK
      { file: 'e.tsx', href: '/our-programs' }, // Live - OK
    ];
    const result = findBrokenLinks(links, SAMPLE_ROUTES);
    expect(result).toHaveLength(2);
    const reasons = result.map(function(r) { return r.reason; }).sort();
    expect(reasons).toEqual(['retired', 'unknown']);
  });
});
