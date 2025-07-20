import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlaygroundState } from '../../../../application/state/playground.state';
import { ModalComponent } from '../../organism/modal/modal.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  private state = inject(PlaygroundState);

  fg = computed(() => this.state.formGroup());
  def = computed(() => this.state.formConfig());
  opts = computed(() => this.state.options());

  ngOnInit() {
    this.state.loadForm();
  }

  onSelect(name: string, value: string) {
    if (name === 'country') this.state.selectCountry(value);
    if (name === 'state') this.state.selectState(value);
  }

  submit() {
    console.log('entra al submit?', this.fg()?.valid)
    const form = this.fg();
    if (form?.valid) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const modalWidth = `${Math.round(vw * 0.8)}px`;
      const modalHeight = `${Math.round(vh * 0.7)}px`;

      // 1) Obtén los datos introducidos
      const dataJson = JSON.stringify(form.value, null, 2);

      // 2) Actualiza la configuración del modal para mostrar esos datos
      this.state.updateModalConfig({
        backdrop: true,
        backdropColor: 'rgba(0,0,0,0.5)',
        closeOnBackdropClick: true,
        closeOnEscape: true,
        showHeader: true,
        headerText: 'Datos del Formulario',
        showFooter: true,
        actions: [{ label: 'Cerrar', role: 'default' }],
        contentType: 'plainText',
        contentText: dataJson,
        width: '400px',
        height: '400px',
        maxWidth: '400px',
        maxHeight: '400px',
        verticalAlign: 'center',
        enterAnimation: 'fade',
        exitAnimation: 'fade',
        theme: 'light',
        borderRadius: '8px',
        ariaLabel: 'Resumen de datos',
        role: 'dialog',
        contentPadding: 'normal',
        contentAlignment: 'left',
        scrollable: true,
        fontSize: '0.9rem',
        lineHeight: '1.4',
        textColor: '#333'
      });

      // 3) Dispara la apertura del modal
      this.state.showModal();
    }
  }


}
