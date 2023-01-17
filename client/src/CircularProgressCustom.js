import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const CircularProgressCustom = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top-color: #3498db;
  animation: ${rotate} 0.8s linear infinite;
`;

const Loading = () => <CircularProgressCustom />;

export default Loading;
