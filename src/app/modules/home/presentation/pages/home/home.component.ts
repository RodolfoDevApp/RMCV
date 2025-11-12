import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../../shared/material/material.imports';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  gridCols = 3;

  private scrollContainer: HTMLElement | null = null;
  private readonly scrollHandler = (event: Event) => this.onContainerScroll(event);

  // Observers
  private metricsObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;
  private archStepObserver?: IntersectionObserver;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.gridCols = 1;
        } else if (result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.Medium]) {
          this.gridCols = 2;
        } else {
          this.gridCols = 3;
        }
      });
  }

  ngAfterViewInit(): void {
    // Typing demo (opcional, no bloquea)
    const phrases = ['Clean Architecture', 'Hexagonal', 'Microservices', 'Event-driven'];
    const element = document.querySelector('.typing-text') as HTMLElement | null;
    if (element) this.runTyping(element, phrases);

    // Navbar inicia abajo
    this.setNavbarPosition(false);

    // Scroll container (usa el contenedor del layout)
    this.scrollContainer = document.querySelector('.layout-content') as HTMLElement | null;
    if (this.scrollContainer) {
      this.scrollContainer.addEventListener('scroll', this.scrollHandler, { passive: true });
      this.updateHeroAndNavbar(this.scrollContainer.scrollTop || 0);
    }

    // Impact strip: count-up cuando entra a viewport
    const metrics = Array.from(document.querySelectorAll<HTMLElement>('.metric[data-target]'));
    if (metrics.length) {
      this.metricsObserver = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              this.animateCounter(el);
              this.metricsObserver?.unobserve(el);
            }
          });
        },
        { threshold: 0.45 }
      );
      metrics.forEach(m => this.metricsObserver!.observe(m));
    }

    // Reveal en casos y CTA
    const revealables = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (revealables.length) {
      this.revealObserver = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              this.revealObserver?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      revealables.forEach(r => this.revealObserver!.observe(r));
    }

    // Arch steps: resalta el paso activo
    const steps = Array.from(document.querySelectorAll<HTMLElement>('.arch-step'));
    if (steps.length) {
      this.archStepObserver = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            const id = (e.target as HTMLElement).id;
            const bullet = document.querySelector(`[data-for="${id}"]`);
            if (e.isIntersecting) {
              e.target.classList.add('active');
              bullet?.classList.add('active');
            } else {
              e.target.classList.remove('active');
              bullet?.classList.remove('active');
            }
          });
        },
        { root: this.scrollContainer || null, threshold: 0.6 }
      );
      steps.forEach(s => this.archStepObserver!.observe(s));
    }
  }

  ngOnDestroy(): void {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.scrollHandler);
      this.scrollContainer = null;
    }
    this.metricsObserver?.disconnect();
    this.revealObserver?.disconnect();
    this.archStepObserver?.disconnect();

    // Restaurar navbar y hero
    const header = document.querySelector('app-top-header') as HTMLElement | null;
    if (header) header.classList.remove('nav-top', 'nav-bottom');

    const hero = document.querySelector('.hero-banner') as HTMLElement | null;
    if (hero) {
      hero.style.opacity = '';
      hero.style.transform = '';
    }
  }

  // --------------------------------------------------
  // Scroll handlers (hero fade + navbar travel + ambient hue)
  // --------------------------------------------------
  private onContainerScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop || 0;
    this.updateHeroAndNavbar(scrollTop);
  }

  private updateHeroAndNavbar(scrollTop: number): void {
    const hero = document.querySelector('.hero-banner') as HTMLElement | null;
    const header = document.querySelector('app-top-header') as HTMLElement | null;
    if (!header) return;

    // Fade del hero
    if (hero) {
      const heroHeight = hero.offsetHeight || 1;
      const rawProgress = scrollTop / heroHeight;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      hero.style.opacity = String(1 - progress);
      const translateY = -30 * progress;
      hero.style.transform = `translateY(${translateY}px)`;

      // Cuando el hero casi termina, el navbar ya esta arriba
      const headerHeight = header.offsetHeight || 64;
      const threshold = heroHeight - headerHeight;
      const topNow = scrollTop >= threshold;
      this.setNavbarPosition(topNow);
    } else {
      // Si no hay hero por cualquier razon, manten arriba
      this.setNavbarPosition(true);
    }

    // Ambient hue por progreso de pagina
    const sc = this.scrollContainer!;
    const doc = sc ? sc.scrollHeight - sc.clientHeight : 0;
    const pageProgress = Math.min(Math.max(doc ? scrollTop / doc : 0, 0), 1);
    const hue = 270 + pageProgress * 12; // rango suave 270..282
    const ambient = document.querySelector('.ambient-bg') as HTMLElement | null;
    if (ambient) ambient.style.setProperty('--h', String(Math.round(hue)));
  }

  private setNavbarPosition(top: boolean): void {
    const header = document.querySelector('app-top-header') as HTMLElement | null;
    if (!header) return;
    if (top) {
      header.classList.add('nav-top');
      header.classList.remove('nav-bottom');
    } else {
      header.classList.add('nav-bottom');
      header.classList.remove('nav-top');
    }
  }

  // --------------------------------------------------
  // Typing helper
  // --------------------------------------------------
  private runTyping(el: HTMLElement, phrases: string[]): void {
    let i = 0, j = 0, deleting = false;
    const tick = () => {
      const p = phrases[i];
      if (!deleting) {
        el.textContent = p.substring(0, j + 1);
        j++;
        if (j === p.length) {
          setTimeout(() => {
            deleting = true;
            tick();
          }, 900);
          return;
        }
      } else {
        el.textContent = p.substring(0, j - 1);
        j--;
        if (j === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 55 : 85);
    };
    tick();
  }

  // --------------------------------------------------
  // Counter helper
  // --------------------------------------------------
  private animateCounter(el: HTMLElement): void {
    const target = Number(el.dataset['target'] || '0');
    const duration = 1000; // ms
    const start = performance.now();

    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const val = Math.floor(target * p);
      el.textContent = String(val);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = String(target);
    };
    requestAnimationFrame(step);
  }
}
