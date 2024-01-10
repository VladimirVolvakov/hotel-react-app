import styled from "styled-components";
import { useFetchUser } from "./useFetchUser";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useFetchUser();
  const { avatar, fullName } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={`Photo of ${fullName}`} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
