import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFetchUser } from "../features/authentification/useFetchUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // 1. Загрузить аутентифицированного пользователя:
  const { isLoading, isAuthentificated } = useFetchUser();

  // 2. Если пользователь не аутентифицирован, переадресовать его на страницу аутентификации:
  useEffect(() => {
    if (!isAuthentificated && !isLoading) navigate("/login");
  }, [isAuthentificated, isLoading]);

  // 3. Во время загрузки показать пользователю спиннер:
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. Если пользователь аутентифицирован, отобразить приложение:
  if (isAuthentificated) return children;
};

export default ProtectedRoute;
