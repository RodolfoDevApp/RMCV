import { inject } from '@angular/core';
import { CardConfigApiService } from '../../infrastructure/services/card-config-api.service';

export class LoadCardConfigUseCase {
  private api = inject(CardConfigApiService);
  execute() {
    return this.api.getDefaultConfig();
  }
}
