import styled from "styled-components";

const CornerContainer = styled.span`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
`;

const CornerContainer180 = styled.span`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  > img {
    transform: rotate(180deg);
  }
  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
  }
`;

export { CornerContainer, CornerContainer180 };
