import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.setItem('gabriel-portfolio-locale', 'pt');
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('creates the portfolio application', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the featured Alcateia case and project section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Alcateia');
    expect(text).toContain('MR Serviços');
    expect(text).toContain('Tecnologia é meio');
  });
});
