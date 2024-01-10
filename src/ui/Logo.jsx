import styled from "styled-components";
import { useModeContext } from "../context/ModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Logo = () => {
  const { isDarkMode } = useModeContext();

  const imageSrc = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={imageSrc} alt="Company logo" />
    </StyledLogo>
  );
};

export default Logo;
