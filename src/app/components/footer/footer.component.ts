import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SITE_CONFIG } from '@core/data/portfolio.data';
import { PortfolioStore } from '@core/services/portfolio.store';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly store = inject(PortfolioStore);
  readonly config = SITE_CONFIG;
  readonly currentYear = new Date().getFullYear();
}
