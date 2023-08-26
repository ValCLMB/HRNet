import { useState } from "react";

export const useModal = () => {
  const [modal, setModal] = useState(false);

  const closeModal = () => {
    setModal(false);
  };
  const openModal = () => {
    setModal(true);
  };

  return { modal, closeModal, openModal };
};
