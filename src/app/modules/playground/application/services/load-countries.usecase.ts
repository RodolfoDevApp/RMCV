import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationApiService } from '../../infrastructure/services/location-api.service';
import { Option } from '../../domain/models/concept/location.model';

export class LoadCountriesUseCase {
  private api = inject(LocationApiService);
  execute(): Observable<Option[]> {
    return this.api.getCountries();
  }
}
