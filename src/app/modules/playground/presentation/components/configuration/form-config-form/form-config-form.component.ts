import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { FieldDefinition, FormConfig, ValidatorSpec } from '../../../../domain/models/configurations/form-config.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-config-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-config-form.component.html',
  styleUrl: './form-config-form.component.scss'
})
export class FormConfigFormComponent{
  form!: FormGroup;
  private state = inject(PlaygroundState);
  private fb    = inject(FormBuilder);
  def = computed(() => this.state.formConfig());

  constructor() {
    // Effect en constructor para inicializar cuando def esté listo
    effect(() => {
      const def = this.def();
      if (!def) return;
      if (!this.form) {
        this.form = this.fb.group({
          fields: this.fb.array(def.fields.map(f => this.createFieldGroup(f)))
        });
        this.form.valueChanges.subscribe(v => {
          this.state.updateFormDefinition({ fields: v.fields });
        });
      }
    });
  }

  get fields(): FormArray {
    return this.form.get('fields') as FormArray;
  }

  private createFieldGroup(f: FieldDefinition): FormGroup {
    return this.fb.group({
      name:            [f.name,    Validators.required],
      label:           [f.label,   Validators.required],
      type:            [f.type],
      required:        [f.required],
      optionsEndpoint: [f.optionsEndpoint || null],
      validators: this.fb.array(
        (f.validators || []).map(v =>
          this.fb.group({
            type:    [v.type],
            message: [v.message]
          })
        )
      )
    });
  }

  getValidators(fieldIndex: number): FormArray {
    return this.fields.at(fieldIndex).get('validators') as FormArray;
  }

  /** Devuelve los tipos disponibles según las reglas */
  availableValidatorTypes(i: number): ValidatorSpec['type'][] {
    const all: ValidatorSpec['type'][] = ['required','email','numeric'];
    const used = this.getValidators(i).controls.map(g =>
      g.get('type')!.value as ValidatorSpec['type']
    );
    if (used.includes('numeric')) {
      return [];
    }
    const hasReqOrEmail = used.some(u => u === 'required' || u === 'email');
    return all.filter(t =>
      !used.includes(t)
      && !(hasReqOrEmail && t === 'numeric')
    );
  }

  addValidator(fieldIndex: number) {
    this.getValidators(fieldIndex).push(
      this.fb.group({
        type:    [this.availableValidatorTypes(fieldIndex)[0]],
        message: ['Mensaje de error']
      })
    );
  }

  removeValidator(fieldIndex: number, idx: number) {
    this.getValidators(fieldIndex).removeAt(idx);
  }

  addField() {
    this.fields.push(this.createFieldGroup({
      name:            'nuevo',
      label:           'Nuevo campo',
      type:            'text',
      required:        false,
      validators:      [],
      optionsEndpoint: undefined
    }));
  }

  removeField(idx: number) {
    this.fields.removeAt(idx);
  }

  
}
