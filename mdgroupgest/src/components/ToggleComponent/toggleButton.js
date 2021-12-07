import React from 'react';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { ErrorText, Body } from "../Text/text";

import { MainContainer, ToggleContainer } from './styles'; 
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';

const SwitchButton = ({
  label,
  error,
  onChange,
  ...props
}) => {


  return (
    <MainContainer>

        {label && <Body>{label}</Body>}

        <ToggleContainer className={"toggleContainer"}>
          <FormControlLabel
            control={
              <Switch
                onChange={onChange}
                color="default"
                {...props}
              />
            }
          />
        </ToggleContainer>
        {error && <ErrorText>{error}</ErrorText>}

    </MainContainer>
    
  );
};

export default SwitchButton;