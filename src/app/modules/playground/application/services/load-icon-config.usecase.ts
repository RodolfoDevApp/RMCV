import { inject } from '@angular/core';
import { IconConfigApiService } from '../../infrastructure/services/icon-config-api.service';

export class LoadIconConfigUseCase {
  private api = inject(IconConfigApiService);
  execute() {
    return this.api.getDefaultConfig();
  }
}
