import { ReactNode, useState } from "react";
import { Form } from "./Form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import styles from "./CreateEmployee.module.css";

type ModalProps = {
  isActive: boolean;
  close: () => void;
  children: ReactNode;
};
const Modal = ({ isActive, close, children }: ModalProps) => {
  if (!isActive) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}{" "}
        <button onClick={close} className={styles.closeModal}>
          X
        </button>
      </div>
    </div>
  );
};

const useModal = () => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  return { modal, closeModal, openModal };
};

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
