import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logout from "../features/authentification/Logout";
import ButtonIcon from "./ButtonIcon";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const HeaderMenu = () => {
  const navigate = useNavigate();
  return (
    <StyledHeaderMenu>
      <li></li>
      <li></li>
      <li></li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
};

export default HeaderMenu;
