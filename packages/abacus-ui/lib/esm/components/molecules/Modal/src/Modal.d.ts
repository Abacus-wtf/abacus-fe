import { FunctionComponent } from "react";
declare type ModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
};
declare const Modal: FunctionComponent<ModalProps>;
export default Modal;
