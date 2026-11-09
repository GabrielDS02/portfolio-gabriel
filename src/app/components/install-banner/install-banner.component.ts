import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { InstallPromptService } from '@core/services/install-prompt.service';
import { PortfolioStore } from '@core/services/portfolio.store';

@Component({
  selector: 'app-install-banner',
  standalone: true,
  templateUrl: './install-banner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstallBannerComponent {
  readonly store = inject(PortfolioStore);
  readonly installPrompt = inject(InstallPromptService);
  readonly dismissed = signal(false);
}
