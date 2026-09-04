/**
 * Progressive enhancement only. The site is fully functional without JavaScript;
 * this script adds small conveniences.
 */

export function setCurrentYear(doc: Document = document): void {
  const year = String(new Date().getFullYear());
  doc.querySelectorAll<HTMLElement>('[data-current-year]').forEach((el) => {
    el.textContent = year;
  });
}

export function highlightActiveSection(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Primary"] a[href*="#"]'),
  );
  if (links.length === 0 || !('IntersectionObserver' in window)) return;

  const byId = new Map<string, HTMLAnchorElement>();
  for (const link of links) {
    const id = link.getAttribute('href')?.split('#')[1];
    if (id) byId.set(id, link);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const link = byId.get(entry.target.id);
        if (!link) continue;
        if (entry.isIntersecting) {
          link.setAttribute('aria-current', 'true');
          link.classList.add('text-accent');
        } else {
          link.removeAttribute('aria-current');
          link.classList.remove('text-accent');
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );

  for (const id of byId.keys()) {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  }
}

setCurrentYear();
highlightActiveSection();
