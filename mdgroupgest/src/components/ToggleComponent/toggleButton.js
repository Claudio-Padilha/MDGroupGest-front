import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import MainContainer from './styles'; 

const SwitchButton = ({labelName}) => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((prev) => !prev );
  };

  return (
    <MainContainer>
        <FormControlLabel
          label={labelName}
          control={<Switch checked={checked} onChange={toggleChecked} color="default" />}
        />
    </MainContainer>
  );
};

export default SwitchButton;