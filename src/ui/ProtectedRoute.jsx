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
  const { isLoading, isAuthentificated } = useFetchUser();

  useEffect(() => {
    if (!isAuthentificated && !isLoading) navigate("/login");
  }, [isAuthentificated, navigate, isLoading]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthentificated) return children;
};

export default ProtectedRoute;
