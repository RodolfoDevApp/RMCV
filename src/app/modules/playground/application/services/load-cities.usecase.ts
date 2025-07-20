import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationApiService } from '../../infrastructure/services/location-api.service';
import { Option } from '../../domain/models/concept/location.model';

export class LoadCitiesUseCase {
  private api = inject(LocationApiService);
  execute(state: string): Observable<Option[]> {
    return this.api.getCities(state);
  }
}
