import { BaseSyntheticEvent, ReactNode } from "react";

type ModalProps = {
   id?: string;
   children?: ReactNode;
   onClose?: () => void;
};

export default function Modal({
   id = "modal",
   onClose = () => {},
   children,
}: ModalProps) {
   function handleOutSideClick(event: BaseSyntheticEvent) {
      if (event.target.id === id) {
         onClose();
      }
   }

   return (
      <div
         id={id}
         className="modal"
         onClick={(event) => handleOutSideClick(event)}
      >
         <div className="container">
            <div className="closeButtonContainer">
               <button className="close" onClick={onClose} />
            </div>
            <div className="content">{children}</div>
         </div>
      </div>
   );
}
