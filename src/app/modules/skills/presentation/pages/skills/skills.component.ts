import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { MatTabsModule } from '@angular/material/tabs';

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTabsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
navLinks: NavLink[] = [
    { path: 'frontend', label: 'Frontend' },
    { path: 'backend',  label: 'Backend'  },
  ];
}
