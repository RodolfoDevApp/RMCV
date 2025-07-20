import { CommonModule, NgIf } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class.full-width]': 'config()?.fullWidth',
    '[class.icon-end]': 'config()?.iconPosition === \"end\"'
  },
})
export class ButtonComponent {
  private state = inject(PlaygroundState);
  config = computed(() => this.state.buttonConfig());

}
