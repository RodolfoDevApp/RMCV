import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  private state = inject(PlaygroundState);
  cfg = computed(() => this.state.iconConfig());
}
