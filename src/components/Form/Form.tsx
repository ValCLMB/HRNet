import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./Form.module.css";
import { employeesFields } from "../../components/employeeFields";
import { Input } from "../../components/Input/Input";

export type SelectOption = {
  label: string;
  value: string;
};

type FormProps = {
  register: UseFormRegister<FieldValues>;
  onSubmit: any;
  errors: FieldErrors<FieldValues>;
};
export const Form = ({ register, onSubmit, errors }: FormProps) => {
  const Error = () => {
    if (Object.keys(errors).length === 0) return;

    return <p className={styles.error}>Please fill all the fields</p>;
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Map the form */}
      {employeesFields.map((input) => {
        // If is Array, then it is a fieldset
        if (Array.isArray(input)) {
          return (
            <fieldset className={styles.fieldset} key={input[0].category}>
              <legend>{input[0].category}</legend>
              {input.map((field) => (
                <Input
                  key={field.param}
                  label={field.label}
                  param={field.param}
                  type={field.type}
                  options={field.options}
                  error={errors[field.param]}
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
            error={errors[input.param]}
            options={input.options}
            register={register}
          />
        );
      })}

      {/* SHOW ERROR  */}
      <Error />
      <button className={styles.btn}>Save</button>
    </form>
  );
};
