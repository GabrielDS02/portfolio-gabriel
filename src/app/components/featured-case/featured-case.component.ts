import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PortfolioStore } from '@core/services/portfolio.store';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-featured-case',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './featured-case.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedCaseComponent {
  readonly store = inject(PortfolioStore);
  readonly projectUrl = 'https://alcateiadoensino.com.br/';
}
