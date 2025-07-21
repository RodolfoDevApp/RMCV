import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../application/state/playground.state';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { COMPONENT_MAP } from '../component-map';
import { ModalComponent } from '../organism/modal/modal.component';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [NgComponentOutlet, CommonModule, ModalComponent],
  templateUrl: './component-preview.component.html',
  styleUrl: './component-preview.component.scss'
})
export class ComponentPreviewComponent {
  state = inject(PlaygroundState);
  component = computed(() => {
    const concept = this.state.selectedConcept();
    return concept ? COMPONENT_MAP[concept.id] ?? null : null;
  });
}
