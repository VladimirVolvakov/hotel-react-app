import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useModeContext } from "../context/ModeContext";

const ModeToggler = () => {
  const { isDarkMode, toggleMode } = useModeContext();

  return (
    <ButtonIcon onClick={toggleMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default ModeToggler;
