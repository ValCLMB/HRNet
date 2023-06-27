import { ComponentPropsWithoutRef } from "react";
import {
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import styles from "./CreateEmployee.module.css";
import { employeesFields } from "../employeeFields";

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
const Input = ({
  label,
  param,
  type = "text",
  options,
  register,
  required,
  ...props
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

export const Form = ({ register, onSubmit }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Map the form */}
      {employeesFields.map((input) => {
        // If is Array, then it is a fieldset
        if (Array.isArray(input)) {
          return (
            <fieldset key={input[0].category}>
              <legend>{input[0].category}</legend>
              {input.map((field) => (
                <Input
                  key={field.param}
                  label={field.label}
                  param={field.param}
                  type={field.type}
                  options={field.options}
                  register={register}
                />
              ))}
            </fieldset>
          );
        }

        return (
          <Input
            key={input.param}
            label={input.label}
            param={input.param}
            type={input.type}
            options={input.options}
            register={register}
          />
        );
      })}
      <button className={styles.btn}>Save</button>
    </form>
  );
};
