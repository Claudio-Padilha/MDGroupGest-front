import styled, { keyframes } from "styled-components";
import { fadeIn, increaseSize } from "../../utils/animations";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  animation: ${fadeIn} 2s linear;
  > img {
    animation: ${increaseSize} 1s;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.26));
    &:hover {
      cursor: pointer;
    }
  }
`;

// const LogoContainerAnimated = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   animation: ${({ isAnimated }) => (isAnimated ? `${fadeIn} 2s linear` : "none")};
//   > img {
//     animation: ${({ isAnimated }) => (isAnimated ? `${increaseSize} 1s` : "none")};
//     animation-timing-function: ${({ isAnimated }) => (isAnimated ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "unset")};
//     filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.26));
//     &:hover {
//       cursor: pointer;
//     }
//   }
// `;

export { LogoContainer };
