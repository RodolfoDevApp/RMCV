import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../material/material.imports';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [...MATERIAL_IMPORTS],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  year = new Date().getFullYear(); 

}
