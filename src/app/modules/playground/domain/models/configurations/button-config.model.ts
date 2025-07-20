export interface ButtonConfig {
  label: string;
  color: 'primary' | 'accent' | 'warn';
  disabled: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end';
  outline: boolean;
  fullWidth: boolean;
  tooltip?: string;
}
