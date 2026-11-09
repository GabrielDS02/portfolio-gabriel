import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EXPERTISE, SITE_CONFIG } from '@core/data/portfolio.data';
import { PortfolioStore } from '@core/services/portfolio.store';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-expertise',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './expertise.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpertiseComponent {
  readonly store = inject(PortfolioStore);
  readonly expertise = EXPERTISE;
  readonly config = SITE_CONFIG;
}
