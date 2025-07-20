import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PlaygroundState } from '../../../../application/state/playground.state';

@Component({
  selector: 'app-modal-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-config-form.component.html',
  styleUrl: './modal-config-form.component.scss'
})
export class ModalConfigFormComponent {
  form!: FormGroup;
  private state = inject(PlaygroundState);
  private fb    = inject(FormBuilder);

  constructor() {
    effect(() => {
      const cfg = this.state.modalConfig();
      if (!cfg) return;

      if (!this.form) {
        this.form = this.fb.group({
          width:                [cfg.width],
          height:               [cfg.height],
          maxWidth:             [cfg.maxWidth],
          maxHeight:            [cfg.maxHeight],
          verticalAlign:        [cfg.verticalAlign],
          backdrop:             [cfg.backdrop],
          backdropColor:        [cfg.backdropColor],
          closeOnBackdropClick: [cfg.closeOnBackdropClick],
          closeOnEscape:        [cfg.closeOnEscape],
          showHeader:           [cfg.showHeader],
          headerText:           [cfg.headerText],
          showFooter:           [cfg.showFooter],
          actions:              [JSON.stringify(cfg.actions)],
          enterAnimation:       [cfg.enterAnimation],
          exitAnimation:        [cfg.exitAnimation],
          theme:                [cfg.theme],
          borderRadius:         [cfg.borderRadius],
          ariaLabel:            [cfg.ariaLabel],
          role:                 [cfg.role],
          contentType:          [cfg.contentType],
          contentText:          [cfg.contentText],
          contentHtml:          [cfg.contentHtml],
          contentMarkdown:      [cfg.contentMarkdown],
          listItems:            [(cfg.listItems || []).join(',')],
          imageUrl:             [cfg.imageUrl],
          contentPadding:       [cfg.contentPadding],
          contentAlignment:     [cfg.contentAlignment],
          scrollable:           [cfg.scrollable],
          fontSize:             [cfg.fontSize],
          lineHeight:           [cfg.lineHeight],
          textColor:            [cfg.textColor],
        });

        this.form.valueChanges.subscribe(v => {
          this.state.updateModalConfig({
            ...v,
            actions:   JSON.parse(v.actions as string),
            listItems: (v.listItems as string).split(',').map(s => s.trim())
          });
        });
      }
    });
  }
}
