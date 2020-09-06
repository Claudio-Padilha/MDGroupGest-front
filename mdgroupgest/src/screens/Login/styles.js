import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 475px;
  max-width: 300vh;
`;

const LoginContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35%;
  height: 100vh;
  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 100%;
    .eEaPpx {
      display: none;
    }
    .ianlYn {
      display: none;
    } 
  }
  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
    .eEaPpx {
      display: none;
    }
    .ianlYn {
      display: none;
    } 
  }
`;

// lnIMEg = input's class
// YZKXG = form's div class
// eAyWro = form's class

export { MainContainer, LoginContainer };