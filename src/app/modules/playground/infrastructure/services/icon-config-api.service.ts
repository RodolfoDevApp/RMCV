import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IconConfig } from '../../domain/models/configurations/icon-config.model';

@Injectable({ providedIn: 'root' })
export class IconConfigApiService {
  getDefaultConfig(): Observable<IconConfig> {
    const mock: IconConfig = {
      icon:  'home',
      size:  48,
      color: '#3f51b5',
      spin:  false
    };
    return of(mock).pipe(delay(500));
  }
}
