import React, { useState } from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ErrorText, Body } from "../Text/text";

import { MainContainer, ToggleContainer } from './styles'; 

const SwitchButton = ({
  label,
  error,
}) => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked((checked) => !checked);
  };

  return (
    <MainContainer>

        {label && <Body>{label}</Body>}

        <ToggleContainer className={"toggleContainer"}>
          <FormControlLabel
            control={
              <Switch
                inputProps={{
                  value: checked
                }}
                checked={checked}
                onChange={toggleChecked}
                color="default"
              />
            }
          />
        </ToggleContainer>
        {error && <ErrorText>{error}</ErrorText>}

    </MainContainer>
    
  );
};

export default SwitchButton;