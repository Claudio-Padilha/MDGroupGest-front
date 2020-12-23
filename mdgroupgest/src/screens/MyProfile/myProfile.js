import React, {useState}from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import { BackIcon } from '../../components/Icon/icons';
import { Body } from '../../components/Text/text';

import { MainContainer, useStyles } from './styles';

import {storage} from "../../firebase/firebase"

import employeesRequests from "../../hooks/requests/employeesRequests"

const MyProfile = (props) => {
  console.log(props, 'props')
  const currentUser = localStorage.getItem('currentUser');
  const user =  JSON.parse(currentUser);
  const allImputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allImputs)


  const history = useHistory();
  const avatarClasses = useStyles()

  const userName = props?.location?.state?.data?.user?.name;
  const email = props?.location?.state?.data?.user?.email;


 const handleImageAsFile = (e) => {
      const image = e.target.files[0]
      setImageAsFile(imageFile => (image))
  }

  const handleFireBaseUpload = async (e) => {
    e.preventDefault()
    // console.log('start of upload')

    if(imageAsFile === '' ) {
      // console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      alert("Selecione uma imagem!")
    }

    const uploadTask = storage.ref(`/images/${imageAsFile.name + user.user.id}`).put(imageAsFile)

    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      // console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name + user?.user?.id).getDownloadURL()
       .then(async fireBaseUrl => {

        var data = {
          id: user.user.id,
          user_type: user.user.user_type,
          avatar: fireBaseUrl
        }
        await employeesRequests.addPhoto(data)  
      
        setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
       })
    })
  }
  


  function _goBack() {
    history.push("/BackOffice");    
  }

  return (
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <Avatar
        alt="Profile Image"
        src={user.user.avatar}
        className={avatarClasses.large}
      />
      <Body>{userName}</Body>
      <Body>{email}</Body>

      <input  
          type="file"
          onChange={handleImageAsFile}
        />

      <button onClick={handleFireBaseUpload}>UPload Image</button>

    </MainContainer>
  )
};

export default MyProfile;