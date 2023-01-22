import styled from "styled-components";
import { FaBomb } from "react-icons/fa";

const ErrorScreen = () => {
  return (
    <ErrorWrapper>
      <FaBomb size={60} color="black" />
      <ErrorMessage>An unknown error has occured.</ErrorMessage>
      <p>
        Please try refreshing the page, or contact support if the problem
        persists
      </p>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorMessage = styled.p`
  font-size: 25px;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
`;

export default ErrorScreen;
