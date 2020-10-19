import React from 'react';

import { MainContainer } from './styles';
import { ReactComponent as CheckCircle } from '../../assets/icons/check-circle-regular.svg';
import { ReactComponent as Back } from '../../assets/icons/back-arrow.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Add } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as Office } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as SeeMore } from '../../assets/icons/seeMore.svg';

const CheckCircleIcon = ({...props}) => {
  return <CheckCircle {...props}/>;
};

const LogoutIcon = ({...props}) => {
  return <Logout {...props} />;
};

const BackIcon = ({...props}) => {
  return <Back {...props}/>;
};

const AddIcon = ({...props}) => {
  return <Add {...props} />;
};

const OfficeIcon = ({...props}) => {
  return <Office {...props} />;
}

const SeeMoreIcon = ({...props}) => {
  return <SeeMore {...props} />;
}


export {
  CheckCircleIcon,
  BackIcon,
  LogoutIcon,
  AddIcon,
  OfficeIcon,
  SeeMoreIcon
};