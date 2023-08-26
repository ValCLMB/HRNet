import { FieldValue, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./Input.module.css";
import { ComponentPropsWithoutRef } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type InputProps = {
  label: string;
  param: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  options?: SelectOption[];
} & ComponentPropsWithoutRef<"input">;

// Input component, can be used for all input fields
export const Input = ({
  label,
  param,
  type = "text",
  options,
  register,
}: InputProps) => {
  if (type === "select" && options) {
    return (
      <div className={styles.input}>
        <label htmlFor={param}>{label}</label>
        <select id={param} {...register(param)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={styles.input}>
      <label htmlFor={param}>{label}</label>
      <input type={type} id={param} {...register(param)} />
    </div>
  );
};
