import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
skills = [
  { label: 'Programación Orientada a Objetos', icon: 'oop.svg' },
  { label: 'Programación Reactiva', icon: 'rxjs.svg' },
  { label: 'Principios SOLID', icon: 'solid.svg' },
  { label: 'Arquitectura Hexagonal', icon: 'hexagonal.svg' },
  { label: 'Apps robustas y escalables', icon: 'scalable.svg' },
  { label: 'Diseño responsivo', icon: 'best-practices.svg' },
  { label: 'Programación frontend', icon: 'best-practices.svg' },
  { label: 'Programación backen', icon: 'best-practices.svg' }
];

}
