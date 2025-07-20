import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-button-config-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,
  CommonModule
  ],
  templateUrl: './button-config-form.component.html',
  styleUrl: './button-config-form.component.scss'
})
export class ButtonConfigFormComponent {
  form!: FormGroup<any>;
  private state = inject(PlaygroundState);
  private fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const cfg = this.state.buttonConfig();
      if (!cfg) {
        return;
      }
      this.form = this.fb.group({
        label:        [cfg.label],
        color:        [cfg.color],
        icon:         [cfg.icon],
        iconPosition: [cfg.iconPosition],
        tooltip:      [cfg.tooltip],
        outline:      [cfg.outline],
        fullWidth:    [cfg.fullWidth],
        disabled:     [cfg.disabled],
      });
      this.form.valueChanges.subscribe(value => {
        this.state.updateButtonConfig(value);
      });
    });
  }
}
