import { Component, computed, inject } from '@angular/core';
import { CustomizationPanelComponent } from '../../components/customization-panel/customization-panel.component';
import { ComponentPreviewComponent } from '../../components/component-preview/component-preview.component';
import { ConceptListComponent } from '../../components/concept-list/concept-list.component';
import { ResizeFromTopDirective } from '../../directives/resize-from-top.directive';
import { PlaygroundState } from '../../../application/state/playground.state';
import { ConfigLauncherComponent } from '../../components/mobile/config-launcher/config-launcher.component';
import { SidebarLauncherComponent } from '../../components/mobile/sidebar-launcher/sidebar-launcher.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [ConceptListComponent,
    ComponentPreviewComponent,
    CustomizationPanelComponent,ResizeFromTopDirective, ConfigLauncherComponent, SidebarLauncherComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  configHeightPercent = 50;
  private state = inject(PlaygroundState);
  expanded = computed(() => this.state.sidebarExpanded())

  onResized = (newHeight: number) => {
  this.configHeightPercent = newHeight;
};
}
