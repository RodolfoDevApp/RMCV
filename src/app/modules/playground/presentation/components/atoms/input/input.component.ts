import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule,CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  host: {
    '[class.full-width]': 'config()?.fullWidth'
  },
})
export class InputComponent {
  private state = inject(PlaygroundState);
  config = computed(() => this.state.inputConfig());
}
