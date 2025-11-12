import { Component, computed, inject, HostBinding } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { sidebarOpen, TopHeaderComponent } from '../top-header/top-header.component';
import { FooterComponent } from '../footer/footer.component';
import { SideHeaderComponent } from '../side-header/side-header.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../modules/playground/presentation/components/organism/modal/modal.component';
import { PlaygroundState } from '../../../modules/playground/application/state/playground.state';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopHeaderComponent,
    FooterComponent,
    SideHeaderComponent,
    ModalComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  sidebar = computed(() => sidebarOpen());
  ps = inject(PlaygroundState);

  private router = inject(Router);

  // El host tendra la clase .is-home solo en Inicio
  @HostBinding('class.is-home')
  isHome = false;

  constructor() {
    // Estado inicial
    this.updateIsHome(this.router.url);

    // Escuchar cambios de ruta
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        const url = e.urlAfterRedirects || e.url;
        this.updateIsHome(url);
      });
  }

  private updateIsHome(rawUrl: string): void {
    const path = (rawUrl || '').split('?')[0];

    // Ajusta si tu ruta de inicio es otra
    this.isHome =
      path === '/' ||
      path === '' ||
      path === '/inicio' ||
      path === '/home';
  }
}
