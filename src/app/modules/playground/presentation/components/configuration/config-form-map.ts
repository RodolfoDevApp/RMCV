import { Type } from '@angular/core';
import { ButtonConfigFormComponent } from './button-config-form/button-config-form.component';
import { InputConfigFormComponent } from './input-config-form/input-config-form.component';
import { IconConfigFormComponent } from './icon-config-form/icon-config-form.component';
import { CardConfigFormComponent } from './card-config-form/card-config-form.component';
import { ModalConfigFormComponent } from './modal-config-form/modal-config-form.component';
import { FormConfigFormComponent } from './form-config-form/form-config-form.component';
export const CONFIG_FORM_MAP: Record<string, Type<unknown>> = { 
    button: ButtonConfigFormComponent, 
    input: InputConfigFormComponent,
    icon: IconConfigFormComponent,
    card: CardConfigFormComponent,
    modal: ModalConfigFormComponent,
    form: FormConfigFormComponent
};