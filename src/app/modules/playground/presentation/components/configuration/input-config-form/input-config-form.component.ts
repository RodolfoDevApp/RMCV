import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-input-config-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule
  ],
  templateUrl: './input-config-form.component.html',
  styleUrl: './input-config-form.component.scss'
})
export class InputConfigFormComponent {
  form!: FormGroup<any>;
  private state = inject(PlaygroundState);
  private fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const cfg = this.state.inputConfig();
      if (!cfg) return;
      this.form = this.fb.group({
        placeholder: [cfg.placeholder],
        type:        [cfg.type],
        prefixIcon:  [cfg.prefixIcon],
        suffixIcon:  [cfg.suffixIcon],
        disabled:    [cfg.disabled],
        fullWidth:   [cfg.fullWidth],
      });
      this.form.valueChanges.subscribe(v => this.state.updateInputConfig(v));
    });
  }
}
