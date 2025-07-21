import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../../shared/material/material.imports';

@Component({
  selector: 'app-frontend',
  standalone: true,
  imports: [MATERIAL_IMPORTS],
  templateUrl: './frontend.component.html',
  styleUrl: './frontend.component.scss'
})
export class FrontendComponent {

}
