/**
 * Decide qué validaciones aplicar a un campo.
 */
export interface ValidatorSpec {
  type: 'required' | 'email' | 'numeric';
  message: string;
}

/**
 * Definición de un campo de formulario.
 */
export interface FieldDefinition {
  name:            string;
  label:           string;
  type:            'text' | 'email' | 'number' | 'select';
  required:        boolean;
  optionsEndpoint?: 'countries' | 'states' | 'cities';
  validators?:     ValidatorSpec[];
}

/**
 * Definición completa del formulario.
 */
export interface FormConfig {
  fields: FieldDefinition[];
}
