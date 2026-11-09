import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { PAGE_COPY, SITE_CONFIG } from '../data/portfolio.data';
import { Locale } from '../models/portfolio.models';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  updateLocale(locale: Locale): void {
    const copy = PAGE_COPY[locale].meta;
    const localeMap: Record<Locale, string> = {
      pt: 'pt_BR',
      en: 'en_US',
      es: 'es_ES',
    };

    this.document.documentElement.lang = locale === 'pt' ? 'pt-BR' : locale;
    this.title.setTitle(copy.title);
    this.meta.updateTag({ name: 'description', content: copy.description });
    this.meta.updateTag({ property: 'og:title', content: copy.title });
    this.meta.updateTag({ property: 'og:description', content: copy.description });
    this.meta.updateTag({ property: 'og:locale', content: localeMap[locale] });
    this.meta.updateTag({ name: 'twitter:title', content: copy.title });
    this.meta.updateTag({ name: 'twitter:description', content: copy.description });

    this.ensureCanonicalUrl();
  }

  private ensureCanonicalUrl(): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.append(canonical);
    }

    canonical.href = `${SITE_CONFIG.siteUrl}/`;
  }
}
