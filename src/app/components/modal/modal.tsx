import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const Modal = ({ children, open }: ModalProps) => {
  return <>{open && createPortal(children, document.body)}</>;
};

export default Modal;
