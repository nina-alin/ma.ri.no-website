import { createPortal } from "react-dom";

interface ModalProperties {
  children: React.ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProperties) => {
  return <>{open && createPortal(children, document.body)}</>;
};

export default Modal;
