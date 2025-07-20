import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { PlaygroundState } from '../../../application/state/playground.state';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-concept-list',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatButtonModule],
  templateUrl: './concept-list.component.html',
  styleUrl: './concept-list.component.scss'
})
export class ConceptListComponent {
  private state = inject(PlaygroundState);
  groups = this.state.groups;
  selected = this.state.selectedConcept;
  expanded = this.state.sidebarExpanded;
  groupStates = signal<Record<string, boolean>>({});

  ngOnInit(): void {
    this.state.loadConceptGroups();
    this.groups().forEach(group => {
      this.groupStates.update(prev => ({ ...prev, [group.id]: true }));
    });
  }

  toggleSidebar() {
    this.state.toggleSidebar();
  }

  select(item: any) {
    this.state.selectConcept(item);
  }
  toggleGroup(groupId: string) {
    this.groupStates.update(state => ({
      ...state,
      [groupId]: !state[groupId]
    }));
  }
 allExpanded = computed(() => {
    const state = this.groupStates();
    return Object.values(state).every(value => value);
  });

  toggleAllGroups() {
    const newState = Object.fromEntries(
      this.groups().map(g => [g.id, !this.allExpanded()])
    );
    this.groupStates.set(newState);
  }
}
