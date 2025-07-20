import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sidebarOpen, TopHeaderComponent } from '../top-header/top-header.component';
import { FooterComponent } from '../footer/footer.component';
import { SideHeaderComponent } from '../side-header/side-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopHeaderComponent, FooterComponent,SideHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    sidebar = computed(() => sidebarOpen());

}
