import { inject } from '@angular/core';
import { ConceptApiService } from '../../infrastructure/services/concept-api.service';

export class LoadConceptGroupsUseCase {
  private api = inject(ConceptApiService);

  execute() {
    return this.api.getConceptGroups();
  }
}
