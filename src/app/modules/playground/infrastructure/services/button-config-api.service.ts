import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ButtonConfig } from '../../domain/models/configurations/button-config.model';

@Injectable({ providedIn: 'root' })
export class ButtonConfigApiService {
  getDefaultConfig(): Observable<ButtonConfig> {
    const mock: ButtonConfig = {
      label: 'Demo Button',
      color: 'primary',
      disabled: false,
      outline: false,
      fullWidth: false,
      icon: 'touch_app',
      iconPosition: 'start',
      tooltip: 'Presiona aquí',
    };
    return of(mock).pipe(delay(500));
  }
}
