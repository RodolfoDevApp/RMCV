import { inject } from '@angular/core';
import { ButtonConfigApiService } from '../../infrastructure/services/button-config-api.service';

export class LoadButtonConfigUseCase {
  private api = inject(ButtonConfigApiService);

  execute() {
    return this.api.getDefaultConfig();
  }
}
