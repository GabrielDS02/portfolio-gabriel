import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ProjectCategory } from '@core/models/portfolio.models';
import { PortfolioStore } from '@core/services/portfolio.store';
import { RevealDirective } from '@shared/directives/reveal.directive';
import { TiltDirective } from '@shared/directives/tilt.directive';

@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [RevealDirective, TiltDirective],
  templateUrl: './project-gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectGalleryComponent {
  readonly store = inject(PortfolioStore);
  readonly filters: readonly ProjectCategory[] = [
    'all',
    'fullstack',
    'frontend',
    'academic',
    'client',
  ];

  filterLabel(filter: ProjectCategory): string {
    return this.store.copy().projects.filters[filter];
  }
}
