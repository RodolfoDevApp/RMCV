import { inject } from '@angular/core';
import { InputConfigApiService } from '../../infrastructure/services/input-config-api.service';

export class LoadInputConfigUseCase {
  private api = inject(InputConfigApiService);
  execute() {
    return this.api.getDefaultConfig();
  }
}
