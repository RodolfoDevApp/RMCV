import { Type } from '@angular/core';
import { ButtonComponent } from './atoms/button/button.component';
import { InputComponent } from './atoms/input/input.component';
import { IconComponent } from './atoms/icon/icon.component';
import { CardComponent } from './molecules/card/card.component';
import { ModalLauncherComponent } from './organism/modal/modal-launcher/modal-launcher.component';
import { FormComponent } from './molecules/form/form.component';

export const COMPONENT_MAP: Record<string, Type<unknown>> = {
  button: ButtonComponent,
  input: InputComponent,
  icon: IconComponent,
  card: CardComponent,
  modal: ModalLauncherComponent,
  form: FormComponent
};
