import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../application/state/playground.state';
import { CONFIG_FORM_MAP } from '../configuration/config-form-map';
import { NgComponentOutlet, NgIf } from '@angular/common';

@Component({
  selector: 'app-customization-panel',
  standalone: true,
  imports: [NgComponentOutlet, NgIf],
  templateUrl: './customization-panel.component.html',
  styleUrl: './customization-panel.component.scss'
})
export class CustomizationPanelComponent {
  private state = inject(PlaygroundState);
  component = computed(() => {
    const sel = this.state.selectedConcept();
    return sel ? CONFIG_FORM_MAP[sel.id] ?? null : null;
  });
}
