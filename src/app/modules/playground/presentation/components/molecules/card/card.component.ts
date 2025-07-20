import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  host: {
    '[class.full-width]': 'config()?.fullWidth'
  },
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
private state = inject(PlaygroundState);
  config = computed(() => this.state.cardConfig());
}
