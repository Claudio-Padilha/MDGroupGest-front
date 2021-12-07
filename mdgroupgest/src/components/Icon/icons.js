import React from 'react';

import { MainContainer } from './styles';
import CONSTANTS from '../../constants';
import { ReactComponent as CheckCircle } from '../../assets/icons/check-circle-regular.svg';
import { ReactComponent as Back } from '../../assets/icons/back-arrow.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Add } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as Office } from '../../assets/icons/plus-solid.svg';
import { ReactComponent as SeeMore } from '../../assets/icons/seeMore.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as ShowPass } from '../../assets/icons/show-pass.svg';
import { ReactComponent as HidePass } from '../../assets/icons/hide-pass.svg';

const passwordIconStyle = {
  width: '4vw',
  height: '2.5vh',
  position: 'absolute',
  bottom: '40%',
  cursor: 'pointer',
  right: '38.5%'
}

const CheckCircleIcon = ({...props}) => {
  return <CheckCircle {...props}/>;
};

const LogoutIcon = ({...props}) => {
  return <Logout {...props} />;
};

const BackIcon = ({...props}) => {
  return <Back style={{color: CONSTANTS?.colors?.darkGrey}} {...props}/>;
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

const EditIcon = ({...props}) => {
  return <Edit {...props} />;
}

const ShowPassIcon = ({...props}) => {
  return <ShowPass {...props} style={passwordIconStyle} />;
}

const HidePassIcon = ({...props}) => {
  return <HidePass {...props} style={passwordIconStyle} />;
}

export {
  CheckCircleIcon,
  BackIcon,
  LogoutIcon,
  AddIcon,
  EditIcon,
  OfficeIcon,
  SeeMoreIcon,
  ShowPassIcon,
  HidePassIcon
};