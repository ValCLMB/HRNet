import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "../../components/Form/Form";
import { useModal } from "../../components/Modal/useModal";

export const CreateEmployee = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const { modal, closeModal, openModal } = useModal();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const localData = localStorage.getItem("employees");

    // Save to local storage
    if (localData) {
      const employees = JSON.parse(localData);
      employees.push(data);
      localStorage.setItem("employees", JSON.stringify(employees));
    } else {
      localStorage.setItem("employees", JSON.stringify([data]));
    }

    openModal();
  };

  return (
    <>
      <h1>HRNet</h1>
      <h2>Create employee</h2>
      <a href="/list">View current employees</a>
      <Form register={register} onSubmit={handleSubmit(onSubmit)} />
      <Modal isActive={modal} close={closeModal}>
        Employee Created !
      </Modal>
    </>
  );
};
