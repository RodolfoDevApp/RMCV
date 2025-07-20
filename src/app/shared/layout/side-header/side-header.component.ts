import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material/material.imports';
import { sidebarOpen } from '../top-header/top-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-header',
  standalone: true,
  imports: [...MATERIAL_IMPORTS,RouterModule],
  templateUrl: './side-header.component.html',
  styleUrl: './side-header.component.scss'
})
export class SideHeaderComponent {
closeSidebar() {
    sidebarOpen.set(false);
  }
}
