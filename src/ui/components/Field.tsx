import type { InputHTMLAttributes, ReactNode } from "react";

export interface FieldProps {
  label: string;
  htmlFor: string;
  children?: ReactNode;
}

/** Wraps a labeled form control — pair with TextInput or a custom control. */
export function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ className = "", ...rest }: TextInputProps) {
  return <input className={`input ${className}`.trim()} {...rest} />;
}

export interface SegOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  name: string;
  options: SegOption[];
  value: string;
  onChange: (value: string) => void;
}

/** Wraps .seg / .seg-opt — used for onboarding's connect-vs-upload choice, etc. */
export function SegmentedControl({ name, options, value, onChange }: SegmentedControlProps) {
  return (
    <div className="seg">
      {options.map((opt) => (
        <label key={opt.value} className="seg-opt">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
