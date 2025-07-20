import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-card-config-form',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule],
  templateUrl: './card-config-form.component.html',
  styleUrl: './card-config-form.component.scss'
})
export class CardConfigFormComponent {
  elevations = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24] as const;
  form!: FormGroup<any>;
  private state = inject(PlaygroundState);
  private fb = inject(FormBuilder);

  constructor() {
    effect(() => {
      const cfg = this.state.cardConfig();
      if (!cfg) return;
      this.form = this.fb.group({
        title: [cfg.title],
        subtitle: [cfg.subtitle],
        content: [cfg.content],
        imageUrl: [cfg.imageUrl],
        elevation: [cfg.elevation],
        fullWidth: [cfg.fullWidth],
      });
      this.form.valueChanges.subscribe(v => this.state.updateCardConfig(v));
    });
  }
}
