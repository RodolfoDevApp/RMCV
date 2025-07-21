import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sidebarOpen, TopHeaderComponent } from '../top-header/top-header.component';
import { FooterComponent } from '../footer/footer.component';
import { SideHeaderComponent } from '../side-header/side-header.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../modules/playground/presentation/components/organism/modal/modal.component';
import { PlaygroundState } from '../../../modules/playground/application/state/playground.state';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopHeaderComponent, FooterComponent,SideHeaderComponent, ModalComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    sidebar = computed(() => sidebarOpen());
    ps = inject(PlaygroundState);
}
