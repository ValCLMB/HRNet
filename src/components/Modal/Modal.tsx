import { ReactNode, useState } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  isActive: boolean;
  close: () => void;
  children: ReactNode;
};

export const Modal = ({ isActive, close, children }: ModalProps) => {
  if (!isActive) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {children}
        <button onClick={close} className={styles.closeModal}>
          X
        </button>
      </div>
    </div>
  );
};
