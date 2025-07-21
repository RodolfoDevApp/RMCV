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
    const form = this.fg();
    if (form?.valid) {
      
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
        width: '50%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
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
      
      this.state.openPreviewModal(this.state.modalConfig()!);
      // // 3) Dispara la apertura del modal
      // this.state.showModal();
    }
  }


}
