export interface InputConfig {
  placeholder: string;
  type: 'text' | 'password' | 'email' | 'number';
  disabled: boolean;
  fullWidth: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
}
