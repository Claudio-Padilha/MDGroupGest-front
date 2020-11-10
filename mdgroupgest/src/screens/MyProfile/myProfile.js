import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import { BackIcon } from '../../components/Icon/icons';
import { Body } from '../../components/Text/text';

import { MainContainer, useStyles } from './styles';

const MyProfile = (props) => {
  console.log(props, 'props')

  const history = useHistory();
  const avatarClasses = useStyles()

  const userName = props?.location?.state?.data?.user?.name;
  const email = props?.location?.state?.data?.user?.email;

  function _goBack() {
    history.push("/BackOffice");    
  }

  return (
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <Avatar
        alt="Profile Image"
        src="../../assets/icons/func9.png"
        className={avatarClasses.large}
      />
      <Body>{userName}</Body>
      <Body>{email}</Body>
    </MainContainer>
  )
};

export default MyProfile;