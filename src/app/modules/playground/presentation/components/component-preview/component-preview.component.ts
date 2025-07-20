import { Component, computed, inject } from '@angular/core';
import { PlaygroundState } from '../../../application/state/playground.state';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { COMPONENT_MAP } from '../component-map';

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [NgComponentOutlet, CommonModule],
  templateUrl: './component-preview.component.html',
  styleUrl: './component-preview.component.scss'
})
export class ComponentPreviewComponent {
  private state = inject(PlaygroundState);
  component = computed(() => {
    const concept = this.state.selectedConcept();
    return concept ? COMPONENT_MAP[concept.id] ?? null : null;
  });
}
