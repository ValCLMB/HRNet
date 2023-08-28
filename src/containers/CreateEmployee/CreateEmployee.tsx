import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "../../components/Modal/Modal";
import { Form } from "../../components/Form/Form";
import { useModal } from "../../components/Modal/useModal";
import { useLocalData } from "../../hooks/useLocalData";
import { Employee } from "../ListEmployee/ListEmployee";

export const CreateEmployee = () => {
  const { register, handleSubmit } = useForm<FieldValues>();
  const { datas: previousData, addToLocalStorage } =
    useLocalData<Employee>("employees");
  const { modal, closeModal, openModal } = useModal();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    addToLocalStorage([...previousData, data]);
    console.log(previousData);
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
