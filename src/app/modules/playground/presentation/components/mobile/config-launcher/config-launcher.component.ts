import { Component, computed, inject, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../../../shared/material/material.imports';
import { CommonModule } from '@angular/common';
import { CONFIG_FORM_MAP } from '../../configuration/config-form-map';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { ModalConfig } from '../../../../domain/models/configurations/modal-config.model';
import { ModalComponent } from '../../organism/modal/modal.component';

@Component({
  selector: 'app-config-launcher',
  standalone: true,
  imports: [MATERIAL_IMPORTS, CommonModule, ModalComponent],
  templateUrl: './config-launcher.component.html',
  styleUrl: './config-launcher.component.scss'
})
export class ConfigLauncherComponent {
  private state = inject(PlaygroundState);
  configOpen = false;

  hasSelection = computed(() => !!this.state.selectedConcept());

  private get configModalConfig(): Partial<ModalConfig> {
    const cfg = this.state.currentModalConfig() || {};
    const componentMap: Record<string, any> = CONFIG_FORM_MAP;
    const comp = componentMap[this.state.selectedConcept()?.id || ''] ?? null;

    return {
      width: '100vw', height: '100vh',
      maxWidth: '100vw', maxHeight: '100vh',
      backdrop: true, backdropColor: 'rgba(0,0,0,0.5)',
      closeOnBackdropClick: true, closeOnEscape: true,
      showHeader: true, headerText: 'Configuración',
      showFooter: false, actions: [],
      enterAnimation: 'slide', exitAnimation: 'slide',
      theme: 'light', borderRadius: '0',
      ariaLabel: 'Configuración de componente', role: 'dialog',
      component: comp,
      contentPadding: 'normal', contentAlignment: 'left',
      scrollable: true, fontSize: '1rem', lineHeight: '1.5', textColor: '#333'
    };
  }

  openConfig() {
     if (this.configOpen) {
      this.state.hideModal();
      this.configOpen = false;
    } else {
      // cerrar sidebar si estuviera abierto
      this.state.hideModal();
      this.configOpen = true;
      this.state.updateModalConfig(this.configModalConfig);
      this.state.showModal();
    }
  }
}
