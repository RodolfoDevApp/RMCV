import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../../../application/state/playground.state';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';
import { MatButtonModule } from '@angular/material/button';
import { ModalConfig } from '../../../../../domain/models/configurations/modal-config.model';

@Component({
  selector: 'app-modal-launcher',
  standalone: true,
  imports: [CommonModule,MatButtonModule],
  templateUrl: './modal-launcher.component.html',
  styleUrl: './modal-launcher.component.scss',
  host: {
    '[class.full-width]': 'config()?.fullWidth'
  },
})
export class ModalLauncherComponent {
  private ps = inject(PlaygroundState);

  // Exponemos la señal de configuración como un computed
  config = computed(() => this.ps.modalConfig());

  openPreview() {
    this.ps.loadModalConfig();                // carga (asíncrona o mock)
    const cfg = this.ps.modalConfig()!;       // lee el valor actual
    this.ps.openPreviewModal(cfg);            // dispara el modal
  }
  
}
