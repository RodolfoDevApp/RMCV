import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appResizeFromTop]',
  standalone: true,
})
export class ResizeFromTopDirective {
  @Input('appResizeFromTop') onResize!: (newHeightPercent: number) => void;

  private isResizing = false;
  private containerRect!: DOMRect;

  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isResizing = true;

    const container = this.el.nativeElement.parentElement;
    if (!container) return;

    this.containerRect = container.getBoundingClientRect();

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove = (moveEvent: MouseEvent) => {
    if (!this.isResizing) return;

    const mouseY = moveEvent.clientY;
    const offsetY = this.containerRect.bottom - mouseY;
    const containerHeight = this.containerRect.height;
    const newPercent = (offsetY / containerHeight) * 100;

    const clamped = Math.max(20, Math.min(80, newPercent));
    this.onResize?.(clamped);
  };

  private onMouseUp = () => {
    this.isResizing = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };
}
