import { keyframes } from 'styled-components';

export const increaseSize  = keyframes`
  from {
    width: 3%;
  }

  to {
    width: 100%;
  }
`;

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  
  50% {
    transform: scale(1.01);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
`;