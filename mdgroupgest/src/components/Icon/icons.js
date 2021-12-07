import React from 'react'

import CONSTANTS from '../../constants'
import { ReactComponent as CheckCircle } from '../../assets/icons/check-circle-regular.svg'
import { ReactComponent as Back } from '../../assets/icons/back-arrow.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { ReactComponent as Add } from '../../assets/icons/plus-solid.svg'
import { ReactComponent as Office } from '../../assets/icons/plus-solid.svg'
import { ReactComponent as SeeMore } from '../../assets/icons/seeMore.svg'
import { ReactComponent as Edit } from '../../assets/icons/edit.svg'
import { ReactComponent as ShowPass } from '../../assets/icons/show-pass.svg'
import { ReactComponent as HidePass } from '../../assets/icons/hide-pass.svg'

const passwordIconStyle = {
  width: '4vw',
  height: '2.5vh',
  position: 'absolute',
  bottom: '40%',
  cursor: 'pointer',
  right: '38.5%'
}

const CheckCircleIcon = ({...props}) => <CheckCircle {...props}/>
const LogoutIcon = ({...props}) => <Logout {...props} />
const BackIcon = ({...props}) => <Back style={{color: CONSTANTS?.colors?.darkGrey}} {...props}/>
const AddIcon = ({...props}) => <Add {...props} />
const OfficeIcon = ({...props}) => <Office {...props} />
const SeeMoreIcon = ({...props}) => <SeeMore {...props} />
const EditIcon = ({...props}) => <Edit {...props} />
const ShowPassIcon = ({...props}) => <ShowPass {...props} style={passwordIconStyle} />
const HidePassIcon = ({...props}) => <HidePass {...props} style={passwordIconStyle} />

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
}