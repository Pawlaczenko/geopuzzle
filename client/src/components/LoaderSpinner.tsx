// LoaderSpinner.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframe animation for the spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled wrapper for the spinner
const SpinnerWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: rgba(255,255,255,.8);
`;

// Styled spinner
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoaderSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoaderSpinner;