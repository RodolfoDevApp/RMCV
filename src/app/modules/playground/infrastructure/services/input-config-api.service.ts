import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { InputConfig } from '../../domain/models/configurations/input-config.model';

@Injectable({ providedIn: 'root' })
export class InputConfigApiService {
  getDefaultConfig(): Observable<InputConfig> {
    const mock: InputConfig = {
      placeholder: 'Escribe aquí…',
      type: 'text',
      disabled: false,
      fullWidth: false,
      prefixIcon: 'person',
      suffixIcon: 'visibility_off'
    };
    return of(mock).pipe(delay(500));
  }
}
