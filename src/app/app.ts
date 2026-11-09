import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { ContactComponent } from './components/contact/contact.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { FeaturedCaseComponent } from './components/featured-case/featured-case.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { InstallBannerComponent } from './components/install-banner/install-banner.component';
import { ProcessComponent } from './components/process/process.component';
import { ProjectGalleryComponent } from './components/project-gallery/project-gallery.component';
import { PortfolioStore } from './core/services/portfolio.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    FeaturedCaseComponent,
    ProjectGalleryComponent,
    ExpertiseComponent,
    ProcessComponent,
    ContactComponent,
    InstallBannerComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  readonly store = inject(PortfolioStore);

  readonly scrollProgress = signal(0);
  readonly toastMessage = signal('');
  readonly toastVisible = signal(false);
  private toastTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    afterNextRender(() => {
      const updateScrollProgress = (): void => {
        const range = this.document.documentElement.scrollHeight - window.innerHeight;
        this.scrollProgress.set(range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0);
      };
      const updatePointerGlow = (event: PointerEvent): void => {
        this.document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
        this.document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
      };

      updateScrollProgress();
      window.addEventListener('scroll', updateScrollProgress, { passive: true });
      window.addEventListener('resize', updateScrollProgress, { passive: true });
      window.addEventListener('pointermove', updatePointerGlow, { passive: true });
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', updateScrollProgress);
        window.removeEventListener('resize', updateScrollProgress);
        window.removeEventListener('pointermove', updatePointerGlow);
      });
    });
  }

  async copyPresentation(): Promise<void> {
    const value = this.store.copy().hero.pitch;
    let copied: boolean;

    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      const textArea = this.document.createElement('textarea');
      textArea.value = value;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      this.document.body.append(textArea);
      textArea.select();
      copied = this.document.execCommand('copy');
      textArea.remove();
    }

    this.showToast(copied ? this.store.copy().hero.copied : this.store.copy().hero.copyFailed);
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toastMessage.set(message);
    this.toastVisible.set(true);
    this.toastTimer = setTimeout(() => this.toastVisible.set(false), 2600);
  }
}
