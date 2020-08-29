import styled from "styled-components";

const CornerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-end;
  margin-right: 25%;
  margin-top: 25%;
`;

const CornerContainer180 = styled.div`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-left: 25%;
  margin-bottom: 25%;
  > img {
    transform: rotate(180deg);
  }
  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
  }
`;

export { CornerContainer, CornerContainer180 };
