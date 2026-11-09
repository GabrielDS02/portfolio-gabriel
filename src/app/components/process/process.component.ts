import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PROCESS_STEPS } from '@core/data/portfolio.data';
import { PortfolioStore } from '@core/services/portfolio.store';
import { RevealDirective } from '@shared/directives/reveal.directive';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './process.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessComponent {
  readonly store = inject(PortfolioStore);
  readonly steps = PROCESS_STEPS;
}
