import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ConceptGroup } from '../../domain/models/concept/concept.model';

@Injectable({ providedIn: 'root' })
export class ConceptApiService {
  getConceptGroups(): Observable<ConceptGroup[]> {
    const mockGroups: ConceptGroup[] = [
      {
        id: 'atoms',
        name: 'Partículas',
        icon: 'category',
        items: [
          { id: 'button', name: 'Botón', icon: 'smart_button' },
          { id: 'input', name: 'Input', icon: 'input' },
          { id: 'icon', name: 'Icono', icon: 'emoji_symbols' },
        ],
      },
      {
        id: 'molecules',
        name: 'Moléculas',
        icon: 'widgets',
        items: [
          { id: 'form', name: 'Formulario Login', icon: 'login' },
          { id: 'card', name: 'Tarjeta Producto', icon: 'shopping_bag' },
        ],
      },
      {
        id: 'organisms',
        name: 'Organismos',
        icon: 'view_quilt',
        items: [
          { id: 'modal', name: 'Modal', icon: 'web_asset' },
          
        ],
      },
    ];

    return of(mockGroups).pipe(delay(800));
  }
}