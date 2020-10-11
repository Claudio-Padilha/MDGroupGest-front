import React from 'react';

import { MainContainer } from './styles';
import { ReactComponent as CheckCircle } from '../../assets/icons/check-circle-regular.svg';
import { ReactComponent as Back } from '../../assets/icons/back-arrow.svg'

const CheckCircleIcon = ({...props}) => {
  return <CheckCircle {...props}/>;
};

const BackIcon = ({...props}) => {
  return <Back {...props}/>;
};

export { CheckCircleIcon, BackIcon };