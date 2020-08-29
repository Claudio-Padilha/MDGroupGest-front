import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  > img {
    filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.26));
  }
`;

export { LogoContainer };
