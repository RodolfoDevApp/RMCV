import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormConfig } from '../../domain/models/configurations/form-config.model';

@Injectable({ providedIn: 'root' })
export class FormApiService {
  getDefinition(): Observable<FormConfig> {
    const mock: FormConfig = {
      fields: [
        { name: 'email',    label: 'Correo',       type: 'email',  required: true,  validators: [{ type: 'required', message: 'Requerido' }, { type: 'email', message: 'Formato inválido' }] },
        { name: 'age',      label: 'Edad',         type: 'number', required: false, validators: [{ type: 'numeric', message: 'Sólo números' }] },
        { name: 'country',  label: 'País',          type: 'select', required: true,  optionsEndpoint: 'countries', validators: [{ type: 'required', message: 'Requerido' }] },
        { name: 'state',    label: 'Estado',        type: 'select', required: true,  optionsEndpoint: 'states',    validators: [{ type: 'required', message: 'Requerido' }] },
        { name: 'city',     label: 'Ciudad',        type: 'select', required: true,  optionsEndpoint: 'cities',    validators: [{ type: 'required', message: 'Requerido' }] },
      ]
    };
    return of(mock).pipe(delay(300));
  }
}
