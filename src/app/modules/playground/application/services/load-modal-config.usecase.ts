import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalConfigApiService } from '../../infrastructure/services/modal-config-api.service';
import { ModalConfig } from '../../domain/models/configurations/modal-config.model';

export class LoadModalConfigUseCase {
  private api = inject(ModalConfigApiService);

  /** Recupera la configuración del modal */
  execute(): Observable<ModalConfig> {
    return this.api.getDefaultConfig();
  }
}
