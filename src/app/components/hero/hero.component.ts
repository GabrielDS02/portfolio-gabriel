import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';

import { SITE_CONFIG } from '@core/data/portfolio.data';
import { PortfolioStore } from '@core/services/portfolio.store';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  readonly store = inject(PortfolioStore);
  readonly config = SITE_CONFIG;
  readonly copyPresentation = output<void>();
}
