import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalConfig } from '../../domain/models/configurations/modal-config.model';

@Injectable({ providedIn: 'root' })
export class ModalConfigApiService {
  /** Mock de configuración por defecto */
  getDefaultConfig(): Observable<ModalConfig> {
    const mock: ModalConfig = {
      width:     '80vw',
      height:    'auto',
      maxWidth:  '500px',
      maxHeight: '70vh',
      verticalAlign:        'center',
      backdrop:             true,
      backdropColor:        'rgba(0,0,0,0.5)',
      closeOnBackdropClick: true,
      closeOnEscape:        true,
      showHeader:           true,
      headerText:           'Título del Modal',
      showFooter:           true,
      actions: [
        { label: 'Cancelar', role: 'default' },
        { label: 'Aceptar',  role: 'primary' }
      ],
      enterAnimation: 'fade',
      exitAnimation:  'fade',
      theme:        'light',
      borderRadius: '8px',
      ariaLabel:    'Modal genérico',
      role:         'dialog',
      contentType:      'plainText',
      contentText:      'Contenido de ejemplo.',
      listItems:        [],
      imageUrl:         undefined,
      contentHtml:      undefined,
      contentMarkdown:  undefined,
      contentPadding:   'normal',
      contentAlignment: 'left',
      scrollable:       true,
      fontSize:   '1rem',
      lineHeight: '1.5',
      textColor:  '#333',
      component:  undefined,
    };
    return of(mock).pipe(delay(300));
  }
}
