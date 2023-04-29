import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Backdrop({closeHandler}) {
    return <div onClick={closeHandler} className={classes.backdrop}></div>;
}

function ModalOverlay({children}) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
}

function Modal({children, closeHandler}) {
    const overlays = document.getElementById("overlays");
    return (
        <>
            {createPortal(<Backdrop closeHandler={closeHandler} />, overlays)}
            {createPortal(<ModalOverlay>{children}</ModalOverlay>, overlays)}
        </>
    );
}

export default Modal;