import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from '../../organism/modal/modal.component';
import { ModalConfig } from '../../../../domain/models/configurations/modal-config.model';
import { ConceptListComponent } from '../../concept-list/concept-list.component';

@Component({
  selector: 'app-sidebar-launcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ModalComponent,ConceptListComponent],
  templateUrl: './sidebar-launcher.component.html',
  styleUrl: './sidebar-launcher.component.scss'
})
export class SidebarLauncherComponent {
  open = false;
  private state = inject(PlaygroundState);
  hasSelection = computed(() => !!this.state.selectedConcept());

  private get configModalConfig(): Partial<ModalConfig> {
    return {
      width: '50vw', height: '100vh',
      maxWidth: '100vw', maxHeight: '100vh',
      backdrop: true, backdropColor: 'rgba(0,0,0,0.5)',
      closeOnBackdropClick: true, closeOnEscape: true,
      showHeader: true, headerText: 'Conceptos',
      showFooter: false, actions: [],
      enterAnimation: 'slide', exitAnimation: 'slide',
      theme: 'light', borderRadius: '0',
      ariaLabel: 'Menú de conceptos', role: 'dialog',
      component: ConceptListComponent,
      contentPadding: 'normal', contentAlignment: 'left',
      scrollable: true, fontSize: '1rem', lineHeight: '1.5', textColor: '#333'
    };
  }

  toggleMenu() {
    if (this.open) {
      this.state.hideModal();
      this.open = false;
    } else {
      // cerrar sidebar si estuviera abierto
      this.state.hideModal();
      this.open = true;
      this.state.updateModalConfig(this.configModalConfig);
      this.state.showModal();
    }
  }
}
