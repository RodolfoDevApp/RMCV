import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../material/material.imports';

export const sidebarOpen = signal(false);


@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [RouterModule,...MATERIAL_IMPORTS],
  templateUrl: './top-header.component.html',
  styleUrl: './top-header.component.scss'
})
export class TopHeaderComponent {

  toggleSidebar() {
    sidebarOpen.update(open => !open);
  }

}
