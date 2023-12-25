import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openedCabinId, setOpenedCabinId] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState(null);

  const openMenuHandler = setOpenedCabinId;
  const closeMenuHandler = () => setOpenedCabinId("");
  return (
    <MenusContext.Provider
      value={{
        openedCabinId,
        openMenuHandler,
        closeMenuHandler,
        contextMenuPosition,
        setContextMenuPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const {
    openedCabinId,
    openMenuHandler,
    closeMenuHandler,
    setContextMenuPosition,
  } = useContext(MenusContext);

  const clickHandler = (event) => {
    const rect = event.target.closest("button").getBoundingClientRect();
    setContextMenuPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openedCabinId === "" || openedCabinId !== id
      ? openMenuHandler(id)
      : closeMenuHandler();
  };

  return (
    <StyledToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ children, id }) => {
  const { openedCabinId, contextMenuPosition, closeMenuHandler } =
    useContext(MenusContext);

  const ref = useOutsideClick(closeMenuHandler);

  if (openedCabinId !== id) return null;

  return createPortal(
    <StyledList position={contextMenuPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { closeMenuHandler } = useContext(MenusContext);

  const clickHandler = () => {
    onClick?.();
    closeMenuHandler();
  };

  return (
    <li>
      <StyledButton onClick={clickHandler}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
