import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../../../application/state/playground.state';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-launcher',
  standalone: true,
  imports: [CommonModule,MatButtonModule, ModalComponent],
  templateUrl: './modal-launcher.component.html',
  styleUrl: './modal-launcher.component.scss',
  host: {
    '[class.full-width]': 'config()?.fullWidth'
  },
})
export class ModalLauncherComponent {
  private state = inject(PlaygroundState);

  /** Visible cuando modalVisible === true */
  visible = computed(() => this.state.modalVisible());

  /** Sólo mostramos el botón si ya cargamos config */
  config  = computed(() => this.state.modalConfig());

  /** Abre el modal, cargando config si es necesario */
  open() {
    if (!this.config()) {
      this.state.loadModalConfig();
    }
    this.state.showModal();
  }
}
