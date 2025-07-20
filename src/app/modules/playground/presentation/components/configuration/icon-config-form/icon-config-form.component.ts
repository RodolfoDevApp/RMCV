import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-icon-config-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ],
  templateUrl: './icon-config-form.component.html',
  styleUrl: './icon-config-form.component.scss'
})
export class IconConfigFormComponent {
form!: FormGroup<any>;
  private state = inject(PlaygroundState);
  private fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const cfg = this.state.iconConfig();
      if (!cfg) return;
      this.form = this.fb.group({
        icon:  [cfg.icon],
        size:  [cfg.size],
        color: [cfg.color],
        spin:  [cfg.spin],
      });
      this.form.valueChanges.subscribe(v => this.state.updateIconConfig(v));
    });
  }
}
