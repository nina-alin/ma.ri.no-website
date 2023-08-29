import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProperties {
  children: ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProperties) => {
  return <>{open && createPortal(children, document.body)}</>;
};

export default Modal;
