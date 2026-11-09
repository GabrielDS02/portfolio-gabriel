import { EXPERTISE, PROCESS_STEPS, PROJECTS, SITE_CONFIG } from './portfolio.data';

describe('portfolio data', () => {
  it('keeps project identifiers unique and links secure', () => {
    const ids = PROJECTS.map((project) => project.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(PROJECTS.every((project) => project.url.startsWith('https://'))).toBe(true);
  });

  it('provides complete localized project copy', () => {
    for (const project of PROJECTS) {
      for (const locale of ['pt', 'en', 'es'] as const) {
        expect(project.type[locale].trim().length).toBeGreaterThan(0);
        expect(project.summary[locale].trim().length).toBeGreaterThan(0);
        expect(project.imageAlt[locale].trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('exposes a complete professional journey', () => {
    expect(PROJECTS.length).toBeGreaterThanOrEqual(6);
    expect(EXPERTISE.length).toBe(6);
    expect(PROCESS_STEPS.length).toBe(4);
    expect(SITE_CONFIG.linkedin).toContain('linkedin.com/in/');
    expect(SITE_CONFIG.whatsapp).toMatch(/^https:\/\/wa\.me\/55\d+$/);
  });
});
