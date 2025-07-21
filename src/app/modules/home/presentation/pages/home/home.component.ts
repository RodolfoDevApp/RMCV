import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../../shared/material/material.imports';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit{
  gridCols = 4;
  skills = [
    { label: 'OOP' },
    { label: 'RxJS' },
    { label: 'SOLID' },
    { label: 'Hexagonal' },
    { label: 'Escalable' },
    { label: 'Responsive' },
    { label: 'Backend' },
    { label: 'Frontend' }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.gridCols = 2;
      } else if (result.breakpoints[Breakpoints.Small]) {
        this.gridCols = 4;
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.gridCols = 6;
      } else {
        this.gridCols = 8;
      }
    });
  }
  ngAfterViewInit(): void {
  const element = document.querySelector('.typing-text') as HTMLElement;
  const phrases = ['Bienvenido', 'Desarrollo Fullstack', '</>', '{/}'];
  let phraseIndex = 0;
  let letterIndex = 0;
  let deleting = false;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      element.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      if (letterIndex === currentPhrase.length) {
        if (phraseIndex === 0) {
          // Espera luego de "Bienvenido"
          setTimeout(() => {
            deleting = true;
            type();
          }, 1000);
          return;
        } else if (phraseIndex === 1) {
          // Espera luego de "Desarrollo Fullstack"
          setTimeout(() => {
            phraseIndex++;
            deleting = false;
            letterIndex = 0;
            type();
          }, 1200);
          return;
        } else {
          // Alternancia entre </> y {/}
          setTimeout(() => {
            deleting = true;
            type();
          }, 900);
          return;
        }
      }
    } else {
      element.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      if (letterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex === 3) ? 2 : phraseIndex + 1;
      }
    }

    const speed = deleting ? 50 : 80;
    setTimeout(type, speed);
  };

  type();
}
}
