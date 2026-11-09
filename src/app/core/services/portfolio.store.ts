import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

import { PAGE_COPY, PROJECTS } from '../data/portfolio.data';
import { Locale, LocalizedText, ProjectCategory } from '../models/portfolio.models';
import { SeoService } from './seo.service';

const SUPPORTED_LOCALES: readonly Locale[] = ['pt', 'en', 'es'];
const LANGUAGE_STORAGE_KEY = 'gabriel-portfolio-locale';

@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly seo = inject(SeoService);

  readonly locale = signal<Locale>(this.readInitialLocale());
  readonly activeFilter = signal<ProjectCategory>('all');
  readonly copy = computed(() => PAGE_COPY[this.locale()]);
  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.categories.includes(filter));
  });

  constructor() {
    effect(() => {
      const locale = this.locale();
      this.seo.updateLocale(locale);

      if (this.isBrowser) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, locale);
      }
    });
  }

  setLocale(locale: string): void {
    if (SUPPORTED_LOCALES.includes(locale as Locale)) {
      this.locale.set(locale as Locale);
    }
  }

  setFilter(filter: ProjectCategory): void {
    this.activeFilter.set(filter);
  }

  localize(value: LocalizedText): string {
    return value[this.locale()];
  }

  private readInitialLocale(): Locale {
    if (!this.isBrowser) {
      return 'pt';
    }

    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) {
      return saved as Locale;
    }

    const browserLocale = navigator.language.toLowerCase().split('-')[0] as Locale;
    return SUPPORTED_LOCALES.includes(browserLocale) ? browserLocale : 'pt';
  }
}
