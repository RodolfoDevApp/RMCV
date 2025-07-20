import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, computed, HostListener, inject, Type } from '@angular/core';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { ModalConfig } from '../../../../domain/models/configurations/modal-config.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
   private state = inject(PlaygroundState);

  isOpen       = computed(() => this.state.modalVisible());
  cfg          = computed<ModalConfig>(() => this.state.modalConfig()!);
  componentType = computed<Type<any> | null>(() => this.cfg()?.component ?? null);

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isOpen() && this.cfg()?.closeOnEscape) {
      this.close();
    }
  }

  close() {
    this.state.hideModal();
  }
}
