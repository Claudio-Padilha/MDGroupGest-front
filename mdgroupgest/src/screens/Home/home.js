import React from 'react';

import { MainContainer } from './styles';
import Navbar from '../../components/Navbar/navbar';

const Home = () => {
  const OPTIONS = [
    {name: 'test 1'}, 
    {name: 'test 2'}, 
    {name: 'test 3'}
  ];

  return (
    <MainContainer>
      <Navbar 

      >
        <p>NAVBAR</p>
      </Navbar>
    </MainContainer>

  )
}

export default Home;