import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (
      event.pointerType === 'touch' ||
      (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }

    const bounds = this.element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    this.element.style.setProperty('--tilt-x', `${-y * 2.4}deg`);
    this.element.style.setProperty('--tilt-y', `${x * 2.4}deg`);
  }

  @HostListener('pointerleave')
  reset(): void {
    this.element.style.removeProperty('--tilt-x');
    this.element.style.removeProperty('--tilt-y');
  }
}
