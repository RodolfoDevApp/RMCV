import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormConfig } from '../../domain/models/configurations/form-config.model';
import { FormApiService } from '../../infrastructure/services/form-config-api.service';


export class LoadFormDefinitionUseCase {
  private api = inject(FormApiService);
  execute(): Observable<FormConfig> {
    return this.api.getDefinition();
  }
}
