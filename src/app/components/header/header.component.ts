import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';

import { SITE_CONFIG } from '@core/data/portfolio.data';
import { InstallPromptService } from '@core/services/install-prompt.service';
import { PortfolioStore } from '@core/services/portfolio.store';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly store = inject(PortfolioStore);
  readonly theme = inject(ThemeService);
  readonly installPrompt = inject(InstallPromptService);
  readonly config = SITE_CONFIG;
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  changeLanguage(event: Event): void {
    this.store.setLocale((event.target as HTMLSelectElement).value);
  }
}
