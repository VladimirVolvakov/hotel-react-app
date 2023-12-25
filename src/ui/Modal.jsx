import { useContext, useRef } from "react";
import { useState } from "react";
import { cloneElement } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openedWindowName, setOpenedWindowName] = useState("");

  const openModalWindowHandler = setOpenedWindowName;
  const closeModalWindowHandler = () => setOpenedWindowName("");

  return (
    <ModalContext.Provider
      value={{
        openModalWindowHandler,
        closeModalWindowHandler,
        openedWindowName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opensWindowName }) => {
  const { openModalWindowHandler } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => openModalWindowHandler(opensWindowName),
  });
};

const Window = ({ children, name }) => {
  const { openedWindowName, closeModalWindowHandler } =
    useContext(ModalContext);

  const windowRef = useRef();

  useEffect(() => {
    const clickHandler = (event) => {
      if (windowRef.current && !windowRef.current.contains(event.target)) {
        console.log("Click outside");
        closeModalWindowHandler();
      }
    };

    document.addEventListener("click", clickHandler, true);

    return () => document.removeEventListener("click", clickHandler, true);
  }, [closeModalWindowHandler]);

  if (name !== openedWindowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={windowRef}>
        <Button onClick={closeModalWindowHandler}>
          <HiX />
        </Button>
        <div>
          {cloneElement(children, { onCloseModal: closeModalWindowHandler })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
