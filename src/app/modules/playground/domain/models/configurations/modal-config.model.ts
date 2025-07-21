import { Type } from '@angular/core';

/**
 * Configuración editable de un modal.
 */
export interface ModalConfig {
  // 1. Dimensiones
  width:     string;   // e.g. '80vw' | '400px'
  height:    string;   // e.g. '60vh' | 'auto'
  maxWidth:  string;   // e.g. '500px'
  maxHeight: string;   // e.g. '70vh'

  // 2. Posición vertical
  verticalAlign: 'top' | 'center' | 'bottom';

  // 3. Backdrop
  backdrop:      boolean;
  backdropColor: string; // e.g. 'rgba(0,0,0,0.5)'

  // 4. Interacción
  closeOnBackdropClick: boolean;
  closeOnEscape:        boolean;

  // 5. Cabecera
  showHeader: boolean;
  headerText: string;

  // 6. Pie de página
  showFooter: boolean;
  actions: Array<{
    label: string;
    role:  'primary' | 'accent' | 'warn' | 'default';
  }>;

  // 7. Animación
  enterAnimation: 'fade' | 'slide';
  exitAnimation:  'fade' | 'slide';

  // 8. Estilo general
  theme:        'light' | 'dark';
  borderRadius: string;   // e.g. '8px'

  // 9. Accesibilidad
  ariaLabel: string;
  role:      'dialog' | 'alertdialog';

  // 10. Contenido
  contentType: 'plainText' | 'html' | 'markdown' | 'list' | 'image' | 'component';
  contentText?:     string;
  contentHtml?:     string;
  contentMarkdown?: string;
  listItems?:       string[];
  imageUrl?:        string;

  // 11. Layout interno
  contentPadding:   'small' | 'normal' | 'large';
  contentAlignment: 'left' | 'center' | 'right';
  scrollable:       boolean;

  // 12. Tipografía
  fontSize:   string;   // e.g. '1rem'
  lineHeight: string;   // e.g. '1.5'
  textColor:  string;   // e.g. '#333'

  // 13. Componente dinámico
  /**
   * Si se provee, el modal montará este componente en lugar de mostrar `content*`.
   */
  component?: Type<unknown>;
}
