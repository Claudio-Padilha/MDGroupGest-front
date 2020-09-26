import React from 'react';
import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';
import CreateOffice from './screens/CreateOffice/createOffice';
import Home from './screens/Home/home';

import TextWithCalendar from './components/TextWithCalendar/textWithCalendar';
import SwitchButton from './components/ToggleComponent/toggleButton';
import Navbar from './components/Navbar/navbar';

function App() {
  return (
    <CreateContract />
  );
}

export default App;
