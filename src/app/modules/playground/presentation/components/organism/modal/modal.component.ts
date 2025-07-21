import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, computed, HostListener, inject, Input, Type } from '@angular/core';
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
   @Input() config!: ModalConfig;
  @Input() visible!: boolean;
private ps = inject(PlaygroundState);
  close() {
    this.ps.closePreviewModal()
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.visible && this.config.closeOnEscape) {
      this.ps.closePreviewModal();
    }
  }
}
