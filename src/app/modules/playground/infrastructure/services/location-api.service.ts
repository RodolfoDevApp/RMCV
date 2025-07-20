import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Option } from '../../domain/models/concept/location.model';

/** Par genérico label/value */

@Injectable({ providedIn: 'root' })
export class LocationApiService {
  getCountries(): Observable<Option[]> {
    return of([
      { label: 'México', value: 'MX' },
      { label: 'España', value: 'ES' }
    ]).pipe(delay(200));
  }
  getStates(country: string): Observable<Option[]> {
    const data = country === 'MX'
      ? [{ label: 'Jalisco', value: 'JAL' }, { label: 'CDMX', value: 'CMX' }]
      : [{ label: 'Cataluña', value: 'CAT' }, { label: 'Madrid', value: 'MAD' }];
    return of(data).pipe(delay(200));
  }
  getCities(state: string): Observable<Option[]> {
    const data = state === 'JAL'
      ? [{ label: 'Guadalajara', value: 'GDL' }]
      : state === 'CMX'
      ? [{ label: 'Ciudad de México', value: 'CDMX' }]
      : state === 'CAT'
      ? [{ label: 'Barcelona', value: 'BCN' }]
      : [{ label: 'Madrid', value: 'MAD' }];
    return of(data).pipe(delay(200));
  }
}
