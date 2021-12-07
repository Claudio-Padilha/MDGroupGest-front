import React, {useState}from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import { SwishSpinner } from 'react-spinners-kit'

import { BackIcon } from '../../components/Icon/icons'
import { Heading, SubHeading, Body } from '../../components/Text/text'

import {
  MainContainer,
  DivUploadPhoto,
  UploadButton,
  RecoverPasswordButton,
  useStyles,
  WidthMessageContainer
} from './styles'

import {storage} from '../../firebase/firebase'

import employeesRequests from '../../hooks/requests/employeesRequests'
import { recoverPassword } from '../../hooks/requests/userRequests'

const MyProfile = () => {
  const currentUser = localStorage.getItem('userForPhoto')
  const user = JSON.parse(currentUser)
  const allImputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [imageAsUrl, setImageAsUrl] = useState(allImputs)

  const history = useHistory()
  const avatarClasses = useStyles()
  const [isLoading, setIsLoading] = useState(false)

  const userName = user?.user?.name
  const email = user?.user?.email

 const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(() => (image))
  }

  const handleFireBaseUpload = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    if(imageAsFile === '' ) {
      // console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      alert("Selecione uma imagem!")
    }

    const uploadTask = storage.ref(`/images/${imageAsFile.name + user?.user?.id}`).put(imageAsFile)

    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
    }, (err) => {
      //catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name + user?.user?.id).getDownloadURL()
       .then(async fireBaseUrl => {

        var data = {
          id: user?.user?.id,
          user_type: user?.user?.user_type,
          avatar: fireBaseUrl
        }
        await employeesRequests.addPhoto(data)  
        
        setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        setIsLoading(false)
       })
    })
  }

  function _goBack() {
    history.push("/BackOffice")
  }

  return (
    isLoading ?
      <MainContainer>
        <SwishSpinner size={200} color="#686769" loading={isLoading} />
      </MainContainer>
    :
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer>
        <BackIcon onClick={_goBack} />
        <Avatar
          alt="Profile Image"
          src={user?.user?.avatar}
          className={avatarClasses.large}
        />
        <Body>{userName}</Body>
        <Body>{email}</Body>
        <RecoverPasswordButton onClick={() => recoverPassword(user?.user?.id, false)}>
          Mudar senha
        </RecoverPasswordButton>

      <DivUploadPhoto>
        <input
          style={{
            marginTop: '10%',
            display: 'inline-block',
            background: 'linear-gradient(top, #f9f9f9, #e3e3e3)',
            border: '1px solid #999',
            borderRadius: '3px',
            padding: '10px 15px',
            outline: 'none',
            cursor: 'pointer',
            textShadow: '1px 1px #fff',
            fontWeight: '700',
            fontSize: '10pt',
            marginBottom: '3%',
          }}
          type="file"
          onChange={handleImageAsFile}
        />

        <UploadButton onClick={handleFireBaseUpload}>Escolher foto</UploadButton>
      </DivUploadPhoto>

      </MainContainer>
    </>
  )
}

export default MyProfile